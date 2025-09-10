import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deteleTask,
} from "../controllers/tasksControllers.js";

const router = express.Router();

router.get("/", getAllTasks);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deteleTask);

export default router;
