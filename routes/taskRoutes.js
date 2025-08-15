import express from "express";
import { getTasks, addTask, updateTask, deleteTask } from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getTasks);   // Get tasks for a list
router.post("/", authMiddleware, addTask);          // Add a task
router.put("/:id", authMiddleware, updateTask);     // Update a task
router.delete("/:id", authMiddleware, deleteTask);  // Delete a task

export default router;
