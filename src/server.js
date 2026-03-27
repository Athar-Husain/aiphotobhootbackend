// src/server.js
import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Running on ${PORT}`);
});
