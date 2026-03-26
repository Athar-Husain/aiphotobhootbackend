// src/services/ai.service.js
import { GoogleGenAI } from "@google/genai";

// Initialize the GenAI client with API key and force its usage
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  authClientOptions: {
    useApiKey: true, // ensures the SDK uses API key instead of default credentials
  },
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

  // Extract the generated image from the response
  const part = response.candidates[0].content.parts.find((p) => p.inlineData);

  if (!part) throw new Error("No image generated");

  return Buffer.from(part.inlineData.data, "base64");
};
