// src/controllers/quizController.js
import mongoose from "mongoose";
import Quiz from "../models/Quiz.js";
import Progress from "../models/Progress.js";
import { gradeQuiz } from "../services/quizService.js";

/**
 * Submit Quiz Answers
 */
export const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params; // ✅ take from route
    const { courseId, answers } = req.body;
    const userId = req.user?.id;

    if (!quizId || !courseId || !answers) {
      return res.status(400).json({ message: "quizId, courseId and answers are required" });
    }

    // Validate quizId as ObjectId
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: "Invalid quiz ID" });
    }

    const progress = await Progress.findOne({ user: userId, course: courseId });
    if (!progress) return res.status(404).json({ message: "Not enrolled in this course" });

    if (!progress.submittedQuizzes) progress.submittedQuizzes = [];

    if (progress.submittedQuizzes.includes(quizId)) {
      return res.status(400).json({ message: "Quiz already submitted" });
    }

    const result = await gradeQuiz(quizId, answers);

    if (!progress.stats) progress.stats = { quizzesTaken: 0, averageScore: 0 };
    progress.score += result.score;
    progress.stats.quizzesTaken += 1;
    progress.stats.averageScore = progress.score / progress.stats.quizzesTaken;

    progress.submittedQuizzes.push({ quiz: quizId, score: result.score, details: result.correctAnswers, });
    await progress.save();

    res.json({
      message: "Quiz submitted successfully",
      result,
      progress,
      submittedQuizId: quizId,
    });
  } catch (error) {
    console.error("❌ Quiz submission error:", error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

/**
 * Get Quiz Results (for review)
 */
export const getQuizResults = async (req, res) => {
  try {
    const { quizId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: "Invalid quiz ID" });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.json({
      id: quiz._id,
      module: quiz.module,
      questions: quiz.questions.map((q) => ({
        questionText: q.questionText ?? "",
        options: Array.isArray(q.options) ? q.options : [],
        type: q.type ?? "text",
      })),
    });
  } catch (error) {
    console.error("❌ getQuizResults error:", error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

/**
 * Admin: Get All Quizzes
 */
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("module");
    console.log("📤 getAllQuizzes returning:", quizzes);
    res.json(quizzes);
  } catch (error) {
    console.error("❌ getAllQuizzes error:", error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

/**
 * Get Quizzes by Module
 */
export const getQuizzesByModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    console.log("🔎 Fetching quizzes for module:", moduleId);

    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(400).json({ message: "Invalid module ID" });
    }

    const quizzes = await Quiz.find({ module: moduleId });
    res.json(quizzes);
  } catch (error) {
    console.error("❌ getQuizzesByModule error:", error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};
