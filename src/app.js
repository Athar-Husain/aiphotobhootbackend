import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import fs from "fs";
import avatarRoutes from "./routes/avatar.routes.js";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL;

// ⚠️ Ensure folders exist (prevents crash on file upload)
["src/public/uploads", "src/public/generated"].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// ✅ CORS middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// ✅ Handle preflight requests (IMPORTANT)
app.options("*", cors());

// ✅ Security
app.use(helmet());

// ✅ Body parser
app.use(express.json());

// ✅ Static folders (you had these earlier — needed for images!)
app.use("/uploads", express.static("src/public/uploads"));
app.use("/generated", express.static("src/public/generated"));

// ✅ Routes
app.use("/api/avatar", avatarRoutes);

// ✅ Health check route (VERY IMPORTANT for debugging)
app.get("/", (req, res) => {
  res.status(200).send("AI Photobooth Running 🚀");
});

export default app;