// src/server.js
import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

console.log("process.env.PORT", process.env.PORT);
console.log("process.env.BASE_URL", process.env.BASE_URL);
console.log("process.env.GEMINI_API_KEY", process.env.BASE_URL);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
