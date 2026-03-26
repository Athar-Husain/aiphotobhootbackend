// src/services/image.service.js
import sharp from "sharp";
import path from "path";

export const processFinalImage = async (aiBuffer) => {
  const framePath =
    Math.random() > 0.5
      ? path.join("src/public/frames/orange.png")
      : path.join("src/public/frames/blue.png");

  const resized = await sharp(aiBuffer)
    .resize(1200, 1400, { fit: "cover" })
    .toBuffer();

  const finalImage = await sharp(resized)
    .composite([{ input: framePath, top: 0, left: 0 }])
    .jpeg({ quality: 90 })
    .toBuffer();

  return finalImage;
};
