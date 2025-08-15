import express from "express";
import { getLists, addList, deleteList } from "../controllers/listController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getLists);        // Get all lists
router.post("/", authMiddleware, addList);        // Add a new list
router.delete("/:id", authMiddleware, deleteList); // Delete a list

export default router;
