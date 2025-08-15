import { Router } from "express";
import { signup, login , changePassword} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/changepassword", authMiddleware, changePassword);

export default router;