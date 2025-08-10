import express from "express";
import cors from "cors";
import 'dotenv/config'
import { GoogleGenAI } from "@google/genai";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : 'http://localhost:3001',
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, 'dist')));

if (!process.env.GOOGLE_GENAI_API_KEY) {
  console.error('GOOGLE_GENAI_API_KEY environment variable is required');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const MEDICAL_PROMPT = `You are a medical report assistant. Analyze the uploaded test report image and provide a clear, patient-friendly summary without altering or imagining any information. Your response must include: 
(1) Tests Performed – list all tests mentioned, such as blood, urine, or imaging; 
(2) Purpose – explain why the tests were done if mentioned (skip if not written); 
(3) Findings – report all results exactly as shown, with simplified explanations in brackets for non-medical users; 
(4) Doctor's Notes – summarize any remarks or suggestions included in the report only; 
(5) Conclusion – briefly explain what the report suggests based only on its content in simple terms. 
Only use data shown in the image, and do not generate or assume any extra information. Do not ask any follow-up questions. The response should be in markdown format.`;

app.post("/caption", async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    
    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    const contents = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64,
        },
      },
      {
        text: MEDICAL_PROMPT,
      },
    ];

    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents,
    });

    res.json({
      caption: result.candidates?.[0]?.content?.parts?.[0]?.text || "No caption generated"
    });
  } catch (err) {
    console.error('Error generating caption:', err.message);
    res.status(500).json({ error: "Failed to analyze report. Please try again." });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});