import { AssemblyAI, TranscriptLanguageCode } from "assemblyai";
const apikey = process.env.ASSEMBLYAI_API_KEY as string;
const client = new AssemblyAI({
  apiKey: apikey,
});

export async function transcribeAudio(audioFile: string) {
  const len: TranscriptLanguageCode = "es";
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
