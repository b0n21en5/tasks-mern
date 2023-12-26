import express from "express";
import {
  addNewTask,
  deleteTask,
  getAllTasks,
  singleTaskDetails,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/tasksto", addNewTask);

// query: isDone
router.get("/tasksto", getAllTasks);

router.get("/task-details/:taskid", singleTaskDetails);

router.put("/tasks/:idto", updateTask);

router.delete("/tasks/:idto", deleteTask);

export default router;
