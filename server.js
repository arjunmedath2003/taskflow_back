// Import the new package that makes Express work with Netlify
import serverless from "serverless-http";

// These are your existing imports, no changes here
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import listRoutes from "./routes/listRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/api/lists", listRoutes);
router.use("/api/tasks", taskRoutes);

app.use('/.netlify/functions/api', router);
export const handler = serverless(app);