import express from "express";
import {
  getModuleContent,
  markModuleComplete,
  getAllModules
} from "../controllers/moduleController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getAllModules);

router.get("/:moduleId", authenticate, getModuleContent);

router.post("/:moduleId/complete", authenticate, markModuleComplete);

export default router;
