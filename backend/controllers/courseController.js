// src/controllers/courseController.js
import Course from "../models/Course.js";
import Progress from "../models/Progress.js";

/**
 * Get all courses (public)
 */
export const getAllCourses = async (req, res) => {
  try {
    const userId = req.user?.id; // optional if not logged in
    const courses = await Course.find().populate("modules", "title order");

    // add derived fields
    const formatted = courses.map((c) => ({
      ...c.toObject(),
      likesCount: c.likes.length,
      liked: userId ? c.likes.some(id => id.toString() === userId) : false,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Enroll in a course (Student only)
 */
export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id; // comes from authMiddleware

    // Check if already enrolled
    const existingProgress = await Progress.findOne({ user: userId, course: courseId });
    if (existingProgress) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // Create new progress record
    const progress = new Progress({
      user: userId,
      course: courseId,
      completedModules: [],
      score: 0,
      stats: { quizzesTaken: 0, averageScore: 0 },
    });
    await progress.save();

    res.status(201).json({ message: "Enrolled successfully", progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get my enrolled courses + progress
 */
export const getMyCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const progressRecords = await Progress.find({ user: userId })
      .populate("course")
      .populate("completedModules", "title");

    res.json(progressRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get single course details (with modules)
 */
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.id;
    const course = await Course.findById(courseId).populate({
      path: "modules",
      populate: { path: "quiz" },
    });
    if (!course) return res.status(404).json({ message: "Course not found" });

    const formatted = {
      ...course.toObject(),
      likesCount: course.likes.length,
      liked: userId ? course.likes.some(id => id.toString() === userId) : false,
    };

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ⭐ NEW: toggle like/unlike for a course
export const toggleCourseLike = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id; // from authenticate middleware

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const index = course.likes.findIndex(
      (id) => id.toString() === userId.toString()
    );

    if (index === -1) {
      // not liked yet → add
      course.likes.push(userId);
      await course.save();
      return res.json({
        message: "Liked",
        liked: true,
        likesCount: course.likes.length,
      });
    } else {
      // already liked → remove
      course.likes.splice(index, 1);
      await course.save();
      return res.json({
        message: "Unliked",
        liked: false,
        likesCount: course.likes.length,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
