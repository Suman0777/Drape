import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dalleRoutes from "./routes/dalle.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
    res.send("Hello from DALL.E");
});

app.use("/api/v1/dalle", dalleRoutes);

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:", err);
});