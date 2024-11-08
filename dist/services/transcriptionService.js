"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transcribeAudio = transcribeAudio;
const assemblyai_1 = require("assemblyai");
const apikey = process.env.ASSEMBLYAI_API_KEY;
const client = new assemblyai_1.AssemblyAI({
    apiKey: apikey,
});
async function transcribeAudio(audioFile) {
    const len = "es";
    const params = {
        audio: audioFile,
        speaker_labels: true,
        language_code: len,
    };
    const transcript = await client.transcripts.transcribe(params);
    if (transcript.status === "error") {
        throw new Error(`Transcription failed: ${transcript.error}`);
    }
    return {
        text: transcript.text,
        utterances: transcript.utterances?.map((utterance) => ({
            speaker: utterance.speaker,
            text: utterance.text,
        })),
    };
}
