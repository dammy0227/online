import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    contentType: { type: String, enum: ["video", "text"], default: "text" },
    contentUrl: { type: String }, 
    contentPublicId: { type: String }, 
    textContent: { type: String }, 
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Module", moduleSchema);
