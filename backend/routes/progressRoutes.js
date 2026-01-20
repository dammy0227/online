import express from "express";
import {
  getMyProgress,
  updateProgress,
  getProgressByCourse
} from "../controllers/progressController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:courseId", authenticate, getMyProgress);

router.put("/:courseId", authenticate, updateProgress);

router.get("/:courseId/quizzes", authenticate, getProgressByCourse);

export default router;
