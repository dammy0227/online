// src/routes/adminRoutes.js
import express from "express";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  addModule,
  updateModule,
  deleteModule,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  getUserStats,
} from "../controllers/adminController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Only admins can access these routes
router.use(authenticate, authorizeRoles(["admin"]));

// Course management
router.post("/courses", upload.single("thumbnail"), createCourse);
router.put("/courses/:courseId", upload.single("thumbnail"), updateCourse);
router.delete("/courses/:courseId", deleteCourse);

// Module management
router.post("/courses/:courseId/modules", upload.single("file"), addModule);
router.put("/modules/:moduleId", upload.single("file"), updateModule);
router.delete("/modules/:moduleId", deleteModule);


// Quiz management
router.post("/modules/:moduleId/quizzes", addQuiz);
router.put("/quizzes/:quizId", updateQuiz);
router.delete("/quizzes/:quizId", deleteQuiz);

// Platform stats
router.get("/stats", getUserStats);

export default router;
