import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import authRouter from "./routes/auth.route.js";

const app = express();

dotenv.config();
app.use(express.json());

app.use(authRouter);

const PORT = process.env.PORT;

const startServer = () => {
  connectDB();
  app.listen(PORT, () => {
    console.log(`Serve is running at http://localhost:${PORT}`);
  });
};

startServer();
