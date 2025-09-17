// src/routes/authRoutes.js
import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Student Registration
router.post("/register", register);

// Login (student or admin)
router.post("/login", login);

export default router;
