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

router.use(authenticate, authorizeRoles(["admin"]));

router.post("/courses", upload.single("thumbnail"), createCourse);
router.put("/courses/:courseId", upload.single("thumbnail"), updateCourse);
router.delete("/courses/:courseId", deleteCourse);

router.post("/courses/:courseId/modules", upload.single("file"), addModule);
router.put("/modules/:moduleId", upload.single("file"), updateModule);
router.delete("/modules/:moduleId", deleteModule);


router.post("/modules/:moduleId/quizzes", addQuiz);
router.put("/quizzes/:quizId", updateQuiz);
router.delete("/quizzes/:quizId", deleteQuiz);

router.get("/stats", getUserStats);

export default router;
