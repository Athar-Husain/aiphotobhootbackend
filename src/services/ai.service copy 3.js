// src/services/ai.service.js
import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing! Add it to your .env");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // API-key auth
});

export const generateAvatarAI = async (imageBuffer, promptText) => {
  // Prepare the prompt array
  const prompt = [
    { text: promptText },
    {
      inlineData: {
        mimeType: "image/jpeg", // or "image/png"
        data: imageBuffer.toString("base64"),
      },
    },
  ];

  // Call the Gemini API
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-image-preview", // updated model from docs
    contents: prompt,
  });

  // Extract the generated image
  const part = response.candidates[0].content.parts.find((p) => p.inlineData);

  if (!part) throw new Error("No image generated");

  return Buffer.from(part.inlineData.data, "base64");
};
