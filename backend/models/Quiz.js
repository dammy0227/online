import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [{ type: String }], 
        correctAnswer: { type: String, required: true },
        type: { type: String, enum: ["mcq", "short"], default: "mcq" },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
