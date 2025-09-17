// src/controllers/authController.js
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signToken } from "../utils/jwt.js";
import { createUser, findUserByEmail, findUserByUsername } from "../services/userService.js";
import User from "../models/User.js";

/**
 * Register a new Student
 */
export const register = async (req, res) => {
  try {
    const { fullName, email, username, password } = req.body;

    // Check for duplicates
    const existingEmail = await findUserByEmail(email);
    if (existingEmail) return res.status(400).json({ message: "Email already registered" });

    const existingUsername = await findUserByUsername(username);
    if (existingUsername) return res.status(400).json({ message: "Username already taken" });

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Save user as student
    const newUser = await createUser({
      fullName,
      email,
      username,
      password: hashedPassword,
      role: "student",
    });

    // Sign token
    const token = signToken({ id: newUser._id, role: newUser.role });

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Login (Student or Admin)
 */
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier = email or username
 
    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Sign token
    const token = signToken({ id: user._id, role: user.role });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
