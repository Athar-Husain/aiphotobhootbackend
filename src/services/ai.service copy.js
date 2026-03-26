// src/services/ai.service.js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);

export const generateAvatarAI = async (imageBuffer, prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image-preview",
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageBuffer.toString("base64"),
            },
          },
        ],
      },
    ],
    config: {
      responseModalities: ["IMAGE"],
    },
  });

  const part = response.candidates[0].content.parts.find((p) => p.inlineData);

  if (!part) throw new Error("No image generated");

  return Buffer.from(part.inlineData.data, "base64");
};
