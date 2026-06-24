import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import authRouter from "./routes/auth.route.js";

const app = express();

dotenv.config();
app.use(express.json())

app.use(authRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB();
  console.log(`Serve is running at http://localhost:${PORT}`);
});
