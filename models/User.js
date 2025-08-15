import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    theme_pref: { type: String, default: "light" }
});

export default mongoose.model("User", userSchema);