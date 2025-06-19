import express from "express";
import cors from "cors";
import 'dotenv/config'
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.static("."));

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

app.post("/caption", async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    const contents = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64,
        },
      },
      {
        text: `You are a medical report assistant. Analyze the uploaded test report image and provide a clear, patient-friendly summary without altering or imagining any information. Your response must include: 
(1) Tests Performed – list all tests mentioned, such as blood, urine, or imaging; 
(2) Purpose – explain why the tests were done if mentioned (skip if not written); 
(3) Findings – report all results exactly as shown, with simplified explanations in brackets for non-medical users; 
(4) Doctor’s Notes – summarize any remarks or suggestions included in the report only; 
(5) Conclusion – briefly explain what the report suggests based only on its content; 
(6) Follow-up – end with a question like “Would you like help understanding any specific result or term?” 
Only use data shown in the image, and do not generate or assume any extra information.;
the response should be in markdown format.`,
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
    console.error(`error generating caption: ${err.message}`);
    res.status(500).json({ error: "Failed to generate caption." });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on http://localhost:3000");
});
