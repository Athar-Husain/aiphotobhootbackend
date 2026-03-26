import "dotenv/config";
// src/server.js
// import dotenv from "dotenv";
// dotenv.config();
// MUST be at the very top

import app from "./app.js";
import { connectDB } from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 5000;

console.log("process.env.PORT", process.env.PORT);
console.log(
  "process.env.GEMINI_API_KEY",
  process.env.GEMINI_API_KEY ? "loaded" : "undefined",
);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
