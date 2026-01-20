import User from "../models/User.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};


export const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};


export const seedAdminUser = async (adminData) => {
  const adminExists = await User.findOne({ role: "admin" });
  if (!adminExists) {
    const admin = new User(adminData);
    await admin.save();
    return admin;
  }
  return null;
};
