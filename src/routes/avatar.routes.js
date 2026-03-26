// src/routes/avatar.routes.js
import express from "express";
import { generateAvatar } from "../controllers/avatar.controller.js";
import { upload } from "../services/storage.service.js";

const router = express.Router();

router.post("/generate", upload.single("image"), generateAvatar);

export default router;
