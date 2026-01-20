import Course from "../models/Course.js";
import Progress from "../models/Progress.js";


export const getAllCourses = async (req, res) => {
  try {
    const userId = req.user?.id; 
    const courses = await Course.find().populate("modules", "title order");

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

export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const existingProgress = await Progress.findOne({ user: userId, course: courseId });
    if (existingProgress) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

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
