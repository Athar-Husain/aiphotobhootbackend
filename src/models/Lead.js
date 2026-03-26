// src/models/Lead.js
import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  city: String,
  gender: String,
  theme: String,
  originalImage: String,
  generatedImage: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Lead", leadSchema);
