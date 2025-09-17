// src/controllers/progressController.js
import Progress from "../models/Progress.js";
import Course from "../models/Course.js";

/**
 * Get My Progress (per course)
 */
export const getMyProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const progress = await Progress.findOne({ user: userId, course: courseId })
      .populate("course")
      .populate("completedModules", "title");

    if (!progress) {
      return res.status(404).json({ message: "No progress found for this course" });
    }

    // Calculate completion percentage
    const totalModules = await Course.findById(courseId).populate("modules");
    const completionPercentage =
      (progress.completedModules.length / totalModules.modules.length) * 100;

    res.json({
      course: progress.course,
      completedModules: progress.completedModules,
      score: progress.score,
      stats: progress.stats,
      completionPercentage: Math.round(completionPercentage),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Progress (on quiz/module completion)
 */
export const updateProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;
    const { completedModules, score, quizzesTaken } = req.body;

    let progress = await Progress.findOne({ user: userId, course: courseId });
    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    if (completedModules) {
      progress.completedModules = completedModules;
    }
    if (score !== undefined) {
      progress.score += score;
    }
    if (quizzesTaken !== undefined) {
      progress.stats.quizzesTaken += quizzesTaken;
      progress.stats.averageScore =
        progress.score / progress.stats.quizzesTaken;
    }

    await progress.save();

    res.json({ message: "Progress updated", progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProgressByCourse = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { courseId } = req.params;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "userId and courseId are required" });
    }

    const progress = await Progress.findOne({ user: userId, course: courseId });

    if (!progress) return res.status(404).json({ message: "Progress not found" });

  res.json({
  submittedQuizzes: progress.submittedQuizzes.map(s => ({
    quiz: s.quiz,
    score: s.score,
     details: s.details,
  })),
  stats: progress.stats || { quizzesTaken: 0, averageScore: 0 },
  score: progress.score || 0,
 });


  } catch (error) {
    console.error("❌ getProgressByCourse error:", error);
    res.status(500).json({ message: error.message });
  }
};