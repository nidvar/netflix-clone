import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';

import pool from "./db.js";
import { protectRoute } from "./middleware/protectRoute.js";

import authRouter from "./routes/auth.route.js";
import movieRouter from "./routes/movie.route.js";
import searchRouter from "./routes/search.route.js";

const app = express();
const PORT = process.env.PORT || 3001;

const __dirname = path.resolve();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? true
        : "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req, res) => {
  try {
    console.log("Checking database connection...");
    const result = await pool.query("SELECT NOW()");
    return res.status(200).json({ dbTime: result.rows[0], message: "Database connected successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use("/api/auth", authRouter);
app.use("/api/movies", protectRoute, movieRouter);
app.use("/api/search", protectRoute, searchRouter);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  })
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});