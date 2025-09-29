import express from "express";
import tasksRouters from "./routers/tasksRouters.js";
import { connectDB } from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const PORT = process.env.PORT_TODO_LIST || 5001;

const app = express();
// middlewares
app.use(express.json());


const staticAllowedOrigins = [
  "http://localhost:5173",
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      const isVercelPreview = /\.vercel\.app$/.test(origin);
      if (staticAllowedOrigins.includes(origin) || isVercelPreview)
        return cb(null, true);
      cb(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use("/api/tasks", tasksRouters);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Chạy trên cổng: " + PORT);
  });
});
