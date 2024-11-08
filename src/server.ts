import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import { transcriptionRouter } from "./routes/transcription";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/transcription", transcriptionRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
