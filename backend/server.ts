import dotenv from "dotenv";
dotenv.config();

import express from "express";

import router from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 3000;



app.use("/api/auth", router);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});