import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));


app.get("/", (req, res) => {
    res.send("Hello from DALL.E");
});

import dalleRoutes from "./routes/dalle.routes.js";
app.use("/api/v1/dalle", dalleRoutes);

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
 