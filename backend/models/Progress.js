import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  completedModules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
  score: { type: Number, default: 0 },
  stats: {
    quizzesTaken: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
  },
submittedQuizzes: [
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    score: { type: Number, default: 0 },
    details: [
      {
        question: String,
        correct: String,
        userAnswer: String,
        isCorrect: Boolean,
      },
    ],
  },
],

});

export default mongoose.model("Progress", progressSchema);
