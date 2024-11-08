"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transcriptionRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const transcriptionService_1 = require("../services/transcriptionService");
const router = express_1.default.Router();
exports.transcriptionRouter = router;
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.post("/transcribe", upload.single("audio"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No audio file provided" });
        }
        const transcript = await (0, transcriptionService_1.transcribeAudio)(req.file.path);
        res.json(transcript);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Transcription failed", details: error.message });
    }
});
