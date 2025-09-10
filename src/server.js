import express from "express";
import tasksRouters from "./routers/tasksRouters.js";
import { connectDB } from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT_TODO_LIST || 5001;

const app = express();

app.use(express.json());

app.use("/api/tasks", tasksRouters);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Chạy trên cổng: " + PORT);
  });
});
