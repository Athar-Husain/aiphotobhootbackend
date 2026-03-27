import express from "express";
import cors from "cors";
import helmet from "helmet";
import avatarRoutes from "./routes/avatar.routes.js";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL;

// ✅ CORS middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);

// ✅ ADD IT HERE (right after cors)
app.options("*", cors());

app.use(helmet());
app.use(express.json());

// routes
app.use("/api/avatar", avatarRoutes);

app.get("/", (req, res) => {
  res.send("AI Photobooth Running 🚀");
});

export default app;
