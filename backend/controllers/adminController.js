// src/controllers/adminController.js
import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Quiz from "../models/Quiz.js";
import User from "../models/User.js";
import Progress from "../models/Progress.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../services/uploadService.js";

/**
 * Create a new Course
 */
export const createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    let thumbnail = null;
    let thumbnailPublicId = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file.path, "course_thumbnails");
      thumbnail = upload.url;
      thumbnailPublicId = upload.public_id;
    }

    const course = new Course({ title, description, price, thumbnail, thumbnailPublicId });
    await course.save();

    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Course
 */
export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const updates = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Handle new thumbnail upload
    if (req.file) {
      // Delete old thumbnail if it exists
      if (course.thumbnailPublicId) {
        await deleteFromCloudinary(course.thumbnailPublicId);
      }

      const upload = await uploadToCloudinary(req.file.path, "course_thumbnails");
      updates.thumbnail = upload.url;
      updates.thumbnailPublicId = upload.public_id;
    }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updates, { new: true });
    res.json({ message: "Course updated", course: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete Course (with Cloudinary cleanup)
 */
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("modules");

    if (!course) return res.status(404).json({ message: "Course not found" });

    // Delete course thumbnail from Cloudinary
    if (course.thumbnailPublicId) {
      await deleteFromCloudinary(course.thumbnailPublicId);
    }

    // Delete all related modules (and their files)
    for (const module of course.modules) {
      if (module.contentPublicId) {
        await deleteFromCloudinary(module.contentPublicId);
      }
      await Module.findByIdAndDelete(module._id);
    }

    // Finally delete the course
    await Course.findByIdAndDelete(courseId);

    res.json({ message: "Course and related files deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

/**
 * Add Module to Course
 */
export const addModule = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, order, contentType, textContent } = req.body;

    let contentUrl = null;
    let contentPublicId = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file.path, "modules");
      contentUrl = upload.url;
      contentPublicId = upload.public_id;
    }

    const module = new Module({
      title,
      order,
      contentType,
      contentUrl,
      contentPublicId,
      textContent,
      course: courseId,
    });
    await module.save();

    await Course.findByIdAndUpdate(courseId, { $push: { modules: module._id } });

    res.status(201).json({ message: "Module added successfully", module });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Module
 */
export const updateModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const updates = req.body;

    const module = await Module.findById(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    if (req.file) {
      // Delete old file if exists
      if (module.contentPublicId) {
        await deleteFromCloudinary(module.contentPublicId);
      }

      const upload = await uploadToCloudinary(req.file.path, "modules");
      updates.contentUrl = upload.url;
      updates.contentPublicId = upload.public_id;
    }

    const updatedModule = await Module.findByIdAndUpdate(moduleId, updates, { new: true });
    res.json({ message: "Module updated", module: updatedModule });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete Module (with Cloudinary cleanup)
 */
export const deleteModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const module = await Module.findById(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    // Delete file from Cloudinary if exists
    if (module.contentPublicId) {
      await deleteFromCloudinary(module.contentPublicId);
    }

    await Module.findByIdAndDelete(moduleId);
    await Course.findByIdAndUpdate(module.course, { $pull: { modules: moduleId } });

    res.json({ message: "Module deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Add Quiz to Module
 */
export const addQuiz = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { questions } = req.body;

    const quiz = new Quiz({ module: moduleId, questions });
    await quiz.save();

    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Quiz
 */
export const updateQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const updates = req.body;

    const quiz = await Quiz.findByIdAndUpdate(quizId, updates, { new: true });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.json({ message: "Quiz updated", quiz });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete Quiz
 */
export const deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findByIdAndDelete(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * View User Stats (Registrations, Enrollments, Progress)
 */
export const getUserStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalCourses = await Course.countDocuments();

    const totalEnrollments = await Progress.countDocuments();

    // Calculate average completion percentage across all progresses
    const progresses = await Progress.find().populate("course", "modules");
    let totalPercentages = 0;

    progresses.forEach((p) => {
      const totalModules = p.course?.modules?.length || 1;
      const percent = (p.completedModules.length / totalModules) * 100;
      totalPercentages += percent;
    });

    const engagementRate = progresses.length
      ? totalPercentages / progresses.length
      : 0;

    res.json({
      totalStudents,
      totalAdmins,
      totalCourses,
      totalEnrollments,
      engagementRate: Math.round(engagementRate), // round for cleaner UI
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
