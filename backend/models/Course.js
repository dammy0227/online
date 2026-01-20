import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, default: 0 }, 
    thumbnail: { type: String }, 
    thumbnailPublicId: { type: String }, 
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
       likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
