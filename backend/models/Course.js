// src/models/Course.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, default: 0 }, // 0 = free
    thumbnail: { type: String }, // Cloudinary URL
    thumbnailPublicId: { type: String }, // Cloudinary public_id (for deletion)
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
       likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
