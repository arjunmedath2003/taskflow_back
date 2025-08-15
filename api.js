import serverless from "serverless-http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser"; // Import body-parser
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import listRoutes from "./routes/listRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
// We keep bodyParser here as a fallback.
app.use(bodyParser.json());

// --- 🕵️‍♂️ START DEBUGGING & FIXING MIDDLEWARE ---
app.use((req, res, next) => {
    // Check if the body is a buffer
    if (req.body instanceof Buffer) {
        try {
            // Manually parse the buffer to a JSON object
            const parsedBody = JSON.parse(req.body.toString());
            // Replace the buffer with the parsed object
            req.body = parsedBody;
            console.log("--- Manually Parsed Body ---");
        } catch (error) {
            console.error("Error parsing request body buffer:", error);
        }
    }

    console.log("--- NEW REQUEST RECEIVED ---");
    console.log("METHOD:", req.method);
    console.log("URL:", req.originalUrl);
    // This should now log the parsed JSON object, not a buffer.
    console.log("BODY:", req.body); 
    console.log("--------------------------");
    next(); // Pass the request to the next handler
});
// --- END DEBUGGING & FIXING MIDDLEWARE ---

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/api/lists", listRoutes);
router.use("/api/tasks", taskRoutes);

app.use('/.netlify/functions/api', router);

// Use module.exports for maximum compatibility
module.exports.handler = serverless(app);
