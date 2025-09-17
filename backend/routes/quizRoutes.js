// src/routes/quizRoutes.js
import express from "express";
import {
  submitQuiz,
  getQuizResults,
  getAllQuizzes,
  getQuizzesByModule
} from "../controllers/quizController.js";
import { authenticate, } from "../middleware/authMiddleware.js";
// import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin: Get all quizzes
// Admin: Get all quizzes
router.get("/all", authenticate, getAllQuizzes);


// Student: Submit answers
router.post("/:quizId/submit", authenticate, submitQuiz);

// Student: Get quiz (for review)
router.get("/:quizId", authenticate, getQuizResults);

// Student: Get quizzes by module
router.get("/module/:moduleId", authenticate, getQuizzesByModule);



export default router;
