import express from "express";
import multer from "multer";
import { transcribeAudio } from "../services/transcriptionService";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file provided" });
    }

    const transcript = await transcribeAudio(req.file.path);
    res.json(transcript);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Transcription failed", details: error.message });
  }
});

export { router as transcriptionRouter };
