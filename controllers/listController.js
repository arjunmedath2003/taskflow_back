import List from "../models/List.js";

// Get all lists for a user
export const getLists = async (req, res) => {
    try {
        const lists = await List.find({ userId: req.user.id });
        res.status(200).json(lists);
    } catch (error) {
        console.error("Get Lists Error:", error);
        res.status(500).json({ message: "Server error fetching lists." });
    }
};

// Add a new list
export const addList = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "List name is required." });
        }

        const newList = new List({
            name,
            userId: req.user.id
        });

        await newList.save();

        res.status(201).json({ message: "List created successfully!", list: newList });
    } catch (error) {
        console.error("Add List Error:", error);
        res.status(500).json({ message: "Server error adding list." });
    }
};

// Delete a list
export const deleteList = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await List.findOneAndDelete({
            _id: id,
            userId: req.user.id
        });

        if (!deleted) {
            return res.status(404).json({ message: "List not found." });
        }

        res.status(200).json({ message: "List deleted successfully!" });
    } catch (error) {
        console.error("Delete List Error:", error);
        res.status(500).json({ message: "Server error deleting list." });
    }
};
