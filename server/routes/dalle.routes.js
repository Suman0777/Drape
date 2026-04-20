import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai/client.js";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post("/", async (req, res) => {
  try {
    const prompt = req.body?.prompt; 

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log("Prompt:", prompt);

    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "512x512",
    //   response_format: "b64_json",
    });

    const image = response.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message || "Something went wrong");
  }
});

export default router;