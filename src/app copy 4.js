// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import avatarRoutes from "./routes/avatar.routes.js";
import fs from "fs";

const app = express();
// const FRONTEND_URL = process.env.FRONTEND_URL;


const FRONTEND_URLS = [
  process.env.FRONTEND_URL1,
  process.env.FRONTEND_URL2,
];

// create upload folders if missing
["src/public/uploads", "src/public/generated"].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ✅ CORS
app.use(
  cors({
    origin: FRONTEND_URL || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.use(helmet());
app.use(express.json());

// static folders
app.use("/uploads", express.static("src/public/uploads"));
app.use("/generated", express.static("src/public/generated"));

// routes
app.use("/api/avatar", avatarRoutes);

// health check
app.get("/", (req, res) => res.send("AI Photobooth Running 🚀"));

export default app;
