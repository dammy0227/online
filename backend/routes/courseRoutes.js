// src/routes/courseRoutes.js
import express from "express";
import {
  getAllCourses,
  enrollInCourse,
  getMyCourses,
  getCourseById,

  toggleCourseLike
} from "../controllers/courseController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: Get all courses
router.get("/", getAllCourses);

// Authenticated: Enroll, view courses
router.post("/:courseId/enroll", authenticate, enrollInCourse);
router.get("/my", authenticate, getMyCourses);
router.get("/:courseId", authenticate, getCourseById);

router.patch("/:courseId/toggle-like", authenticate, toggleCourseLike);

export default router;
