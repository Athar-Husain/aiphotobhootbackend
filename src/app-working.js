// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import avatarRoutes from "./routes/avatar.routes.js";
import fs from "fs";

const app = express();

// Collect allowed origins from environment variables
const FRONTEND_URLS = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL2,
  process.env.BASE_URL,
].filter(Boolean); // removes undefined or empty values

// Create upload folders if missing
["src/public/uploads", "src/public/generated"].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ✅ CORS setup
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (e.g., Postman) or from allowed URLs
      if (!origin || FRONTEND_URLS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.use(helmet());
app.use(express.json());

// Static folders
app.use("/uploads", express.static("src/public/uploads"));
app.use("/generated", express.static("src/public/generated"));

// Routes
app.use("/api/avatar", avatarRoutes);

// Health check
app.get("/", (req, res) => res.send("AI Photobooth Running 🚀"));

export default app;
