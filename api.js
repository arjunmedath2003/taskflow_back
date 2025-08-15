import serverless from "serverless-http";
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

// --- 🕵️‍♂️ START DEBUGGING MIDDLEWARE ---
// This function will run for every request and log its details.
app.use((req, res, next) => {
    console.log("--- NEW REQUEST RECEIVED ---");
    console.log("METHOD:", req.method);
    console.log("URL:", req.originalUrl);
    // The next line is the most important one. It will show us the request body.
    console.log("BODY:", req.body); 
    console.log("--------------------------");
    next(); // Pass the request to the next handler
});
// --- END DEBUGGING MIDDLEWARE ---

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/api/lists", listRoutes);
router.use("/api/tasks", taskRoutes);

app.use('/.netlify/functions/api', router);

// Use module.exports for maximum compatibility
module.exports.handler = serverless(app);
