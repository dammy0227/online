// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed in controller
    role: { type: String, enum: ["student", "admin"], default: "student" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
