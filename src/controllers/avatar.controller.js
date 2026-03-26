// src/controllers/avatar.controller.js
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import Lead from "../models/Lead.js";
import { generateAvatarAI } from "../services/ai.service.js";
import { processFinalImage } from "../services/image.service.js";
import { getVariationPrompt } from "../services/variation.service.js";

export const generateAvatar = async (req, res) => {
  try {
    const { name, phone, city, gender, theme } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image required" });
    }

    // 1. Save original
    const uploadName = `upload_${uuidv4()}.jpg`;
    const uploadPath = path.join("src/public/uploads", uploadName);

    fs.writeFileSync(uploadPath, req.file.buffer);

    // 2. Get variation prompt
    const prompt = getVariationPrompt(theme, gender);

    // 3. Generate AI image
    const aiBuffer = await generateAvatarAI(req.file.buffer, prompt);

    // 4. Apply frame + resize
    const finalBuffer = await processFinalImage(aiBuffer);

    // 5. Save final
    const genName = `gen_${uuidv4()}.jpg`;
    const genPath = path.join("src/public/generated", genName);

    fs.writeFileSync(genPath, finalBuffer);

    const imageUrl = `${process.env.BASE_URL}/generated/${genName}`;
    const originalUrl = `${process.env.BASE_URL}/uploads/${uploadName}`;

    // 6. Save DB
    const lead = await Lead.create({
      name,
      phone,
      city,
      gender,
      theme,
      originalImage: originalUrl,
      generatedImage: imageUrl,
    });

    res.json({
      success: true,
      data: {
        id: lead._id,
        generatedImage: imageUrl,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
