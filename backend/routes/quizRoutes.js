import express from "express";
import {
  submitQuiz,
  getQuizResults,
  getAllQuizzes,
  getQuizzesByModule
} from "../controllers/quizController.js";
import { authenticate, } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all", authenticate, getAllQuizzes);


router.post("/:quizId/submit", authenticate, submitQuiz);


router.get("/:quizId", authenticate, getQuizResults);

router.get("/module/:moduleId", authenticate, getQuizzesByModule);



export default router;
