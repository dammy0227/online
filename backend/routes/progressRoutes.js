// src/routes/progressRoutes.js
import express from "express";
import {
  getMyProgress,
  updateProgress,
  getProgressByCourse
} from "../controllers/progressController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Student: Get my progress in a course
router.get("/:courseId", authenticate, getMyProgress);

// Student: Update progress manually (module/quiz completion)
router.put("/:courseId", authenticate, updateProgress);

router.get("/:courseId/quizzes", authenticate, getProgressByCourse);

export default router;
