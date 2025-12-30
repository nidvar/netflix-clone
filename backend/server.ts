import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";
import movieRouter from "./routes/movie.route.js";

import pool from "./db.js";

const app = express();
const PORT = process.env.PORT || 3001;

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

// const creatTableFunction = async()=>{
//   const createTable = `
//     CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       );
//   `
//   const result = await pool.query(createTable);
//   console.log(result.command);
// };

// creatTableFunction();

app.use("/api/auth", authRouter);
app.use("/api/movies", movieRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});