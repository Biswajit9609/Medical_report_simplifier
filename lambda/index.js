import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const MEDICAL_PROMPT = `You are a medical report assistant. Analyze the uploaded test report image and provide a clear, patient-friendly summary without altering or imagining any information. Your response must include: 
(1) Tests Performed – list all tests mentioned, such as blood, urine, or imaging; 
(2) Purpose – explain why the tests were done if mentioned (skip if not written); 
(3) Findings – report all results exactly as shown, with simplified explanations in brackets for non-medical users; 
(4) Doctor's Notes – summarize any remarks or suggestions included in the report only; 
(5) Conclusion – briefly explain what the report suggests based only on its content in simple terms. 
Only use data shown in the image, and do not generate or assume any extra information. Do not ask any follow-up questions. The response should be in markdown format.`;

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { imageBase64 } = JSON.parse(event.body);
    
    if (!imageBase64) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Image data is required' })
      };
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        caption: result.candidates?.[0]?.content?.parts?.[0]?.text || "No caption generated"
      })
    };
  } catch (err) {
    console.error('Error generating caption:', err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to analyze report. Please try again." })
    };
  }
};