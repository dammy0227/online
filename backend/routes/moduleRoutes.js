import express from "express";
import {
  getModuleContent,
  markModuleComplete,
  getAllModules
} from "../controllers/moduleController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Admin: Get all modules (with course populated)
router.get("/", authenticate, getAllModules);

// 🔹 Student: Get module content
router.get("/:moduleId", authenticate, getModuleContent);

// 🔹 Student: Mark module as complete
router.post("/:moduleId/complete", authenticate, markModuleComplete);

export default router;
