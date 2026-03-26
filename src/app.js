// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import avatarRoutes from "./routes/avatar.routes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// static folders
app.use("/uploads", express.static("src/public/uploads"));
app.use("/generated", express.static("src/public/generated"));

// routes
app.use("/api/avatar", avatarRoutes);

app.get("/", (req, res) => {
  res.send("AI Photobooth Running 🚀");
});

export default app;
