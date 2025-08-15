import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    dueDate: { type: Date },
    isCompleted: { type: Boolean, default: false },
    listId: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

export default mongoose.model("Task", taskSchema);