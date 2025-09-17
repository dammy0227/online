// src/models/Module.js
import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    contentType: { type: String, enum: ["video", "text"], default: "text" },
    // If contentType === "video" (or other files), contentUrl/contentPublicId will be used
    contentUrl: { type: String }, // Cloudinary URL
    contentPublicId: { type: String }, // Cloudinary public_id (for deletion)
    textContent: { type: String }, // For text lessons
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Module", moduleSchema);
