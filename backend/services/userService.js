// src/services/userService.js
import User from "../models/User.js";

/**
 * Find user by email
 */
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

/**
 * Find user by username
 */
export const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

/**
 * Create new user
 */
export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

/**
 * Seed an initial admin if none exists
 */
export const seedAdminUser = async (adminData) => {
  const adminExists = await User.findOne({ role: "admin" });
  if (!adminExists) {
    const admin = new User(adminData);
    await admin.save();
    return admin;
  }
  return null;
};
