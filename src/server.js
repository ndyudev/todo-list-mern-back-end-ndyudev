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
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/tasks", tasksRouters);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Chạy trên cổng: " + PORT);
  });
});
