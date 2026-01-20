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

router.get("/", getAllCourses);

router.post("/:courseId/enroll", authenticate, enrollInCourse);
router.get("/my", authenticate, getMyCourses);
router.get("/:courseId", authenticate, getCourseById);

router.patch("/:courseId/toggle-like", authenticate, toggleCourseLike);

export default router;
