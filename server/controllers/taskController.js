import { notFound, serverError } from "../helpers/errorHandler.js";
import taskModel from "../models/taskModel.js";

// Add new task controller
export const addNewTask = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return notFound(res, "Name required!");
    }
    if (!description) {
      return notFound(res, "Description required!");
    }

    const newTask = await taskModel(req.body).save();

    return res.send("New task added!");
  } catch (error) {
    return serverError(res, error, "Error while adding new task!");
  }
};

// Fetch all task controller
export const getAllTasks = async (req, res) => {
  try {
    const { isDone, page = 1, pageSize = 8 } = req.query;

    let query = {};

    if (isDone) {
      const isDoneBool = isDone === "true";
      query = { isDone: isDoneBool };
    }

    const totalCount = await taskModel.countDocuments(query);

    const totalPages = Math.ceil(totalCount / pageSize);

    const tasks = await taskModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    return res.send({
      tasks,
      totalCount,
    });
  } catch (error) {
    return serverError(res, error, "Error fetching tasks with pagination!");
  }
};

// Get single task details
export const singleTaskDetails = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.taskid);
    if (!task) {
      return notFound(res, "No task found!");
    }

    return res.send(task);
  } catch (error) {
    return serverError(res, error, "Error fetching single task details!");
  }
};

// Update task controller
export const updateTask = async (req, res) => {
  try {
    const { name, isDone, description } = req.body;

    const task = await taskModel.findById(req.params.idto);
    if (!task) {
      return notFound(res, "No task found!");
    }

    if (name) {
      task.name = name;
    }
    if (description) {
      task.description = description;
    }
    if (isDone !== undefined) {
      task.isDone = isDone;
    }

    const updatedTask = await task.save();

    return res.send(updatedTask);
  } catch (error) {
    return serverError(res, error, "Error updating task");
  }
};

// Delete task controller
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await taskModel.findByIdAndDelete(req.params.idto);

    return res.send({ message: "Task deleted successfully!", deletedTask });
  } catch (error) {
    return serverError(res, error, "Error deleting task!");
  }
};
