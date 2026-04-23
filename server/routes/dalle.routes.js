import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const prompt = req.body?.prompt; 

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log("Prompt:", prompt);

    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
      {
        prompt: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", 
      }
    );
      const image = Buffer.from(response.data).toString("base64");

      res.status(200).json({ photo: image })
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send(error.message || "Something went wrong");
  }
});

export default router;