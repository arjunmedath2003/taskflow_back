import Task from "../models/Task.js";

// Get all tasks in a list
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Get Tasks Error:", error);
        res.status(500).json({ message: "Server error fetching tasks." });
    }
};

// Add a new task
export const addTask = async (req, res) => {
    try {
        const { listId, title, priority,dueDate } = req.body;
        if (!listId || !title) {
            return res.status(400).json({ message: "List ID and title are required." });
        }

        const newTask = new Task({
            title,
            priority,
            dueDate,
            listId,
            userId: req.user.id
        });

        await newTask.save();

        res.status(201).json({ message: "Task added successfully!", task: newTask });
    } catch (error) {
        console.error("Add Task Error:", error);
        res.status(500).json({ message: "Server error adding task." });
    }
};

// Update a task
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { listId, title, priority,dueDate,isCompleted } = req.body;
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { listId, title, priority,dueDate,isCompleted },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found." });
        }

        res.status(200).json({ message: "Task updated successfully!", task: updatedTask });
    } catch (error) {
        console.error("Update Task Error:", error);
        res.status(500).json({ message: "Server error updating task." });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Task.findOneAndDelete({
            _id: id,
            userId: req.user.id
        });

        if (!deleted) {
            return res.status(404).json({ message: "Task not found." });
        }

        res.status(200).json({ message: "Task deleted successfully!" });
    } catch (error) {
        console.error("Delete Task Error:", error);
        res.status(500).json({ message: "Server error deleting task." });
    }
};
