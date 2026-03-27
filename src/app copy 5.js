// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import avatarRoutes from "./routes/avatar.routes.js";
import fs from "fs";

const app = express();

// ----------------------------
// Allowed frontend origins
// ----------------------------
const FRONTEND_URLS = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL2,
  process.env.BASE_URL,
].filter(Boolean); // remove undefined or empty

// ----------------------------
// Create upload folders if missing
// ----------------------------
["src/public/uploads", "src/public/generated"].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ----------------------------
// Global CORS for API routes
// ----------------------------
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

// ----------------------------
// Serve uploads with CORS for frontend URLs only
// ----------------------------
app.use(
  "/uploads",
  (req, res, next) => {
    const origin = req.headers.origin;
    if (FRONTEND_URLS.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }

    if (req.method === "OPTIONS") return res.sendStatus(204);

    next();
  },
  express.static("src/public/uploads"),
  express.static("src/public/uploads"),
);

// ----------------------------
// Serve generated images with CORS for frontend URLs only
// ----------------------------
app.use(
  "/generated",
  (req, res, next) => {
    const origin = req.headers.origin;
    if (FRONTEND_URLS.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }

    if (req.method === "OPTIONS") return res.sendStatus(204);

    next();
  },
  express.static("src/public/generated"),
);

// ----------------------------
// API routes
// ----------------------------
app.use("/api/avatar", avatarRoutes);

// ----------------------------
// Health check
// ----------------------------
app.get("/", (req, res) => res.send("AI Photobooth Running 🚀"));

export default app;
