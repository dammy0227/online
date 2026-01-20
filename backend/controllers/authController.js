import { hashPassword, comparePassword } from "../utils/hash.js";
import { signToken } from "../utils/jwt.js";
import { createUser, findUserByEmail, findUserByUsername } from "../services/userService.js";
import User from "../models/User.js";


export const register = async (req, res) => {
  try {
    const { fullName, email, username, password } = req.body;

    const existingEmail = await findUserByEmail(email);
    if (existingEmail) return res.status(400).json({ message: "Email already registered" });

    const existingUsername = await findUserByUsername(username);
    if (existingUsername) return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = await hashPassword(password);

    const newUser = await createUser({
      fullName,
      email,
      username,
      password: hashedPassword,
      role: "student",
    });

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


export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body; 
 

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

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
