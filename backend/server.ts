import dotenv from "dotenv";
dotenv.config();

import express from "express";

import router from "./routes/auth.route.js";
import pool from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", async (req, res) => {
  try {
    console.log("Checking database connection...");
    const result = await pool.query("SELECT NOW()");
    res.json({ dbTime: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use("/api/auth", router);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});