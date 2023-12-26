import express from "express";
import {
  addNewTask,
  deleteTask,
  getAllTasks,
  singleTaskDetails,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/tasks", addNewTask);

// query: isDone
router.get("/tasks", getAllTasks);

router.get("/task-details/:taskid", singleTaskDetails);

router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask);

export default router;
