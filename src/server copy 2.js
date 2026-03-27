import "dotenv/config";

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 🔌 Connect DB first
    await connectDB();

    console.log("process.env.PORT:", process.env.PORT || "not set");
    console.log(
      "process.env.GEMINI_API_KEY:",
      process.env.GEMINI_API_KEY ? "loaded" : "undefined",
    );

    // 🚀 Start server (IMPORTANT: 0.0.0.0 for Hostinger)
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1); // stop app if critical failure
  }
};

startServer();
