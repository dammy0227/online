// src/controllers/moduleController.js
import Module from "../models/Module.js";
import Progress from "../models/Progress.js";

/**
 * Get Module Content (video/text)
 */
export const getModuleContent = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const module = await Module.findById(moduleId);

    if (!module) return res.status(404).json({ message: "Module not found" });

    res.json({
      id: module._id,
      title: module.title,
      contentType: module.contentType,
      contentUrl: module.contentUrl,
      textContent: module.textContent,
      order: module.order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Mark Module as Complete
 */
export const markModuleComplete = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const userId = req.user.id;

    // Find progress for this course
    const progress = await Progress.findOne({
      user: userId,
      course: req.body.courseId,
    });

    if (!progress) {
      return res.status(404).json({ message: "Not enrolled in this course" });
    }

    // Prevent duplicate marking
    if (progress.completedModules.includes(moduleId)) {
      return res.status(400).json({ message: "Module already completed" });
    }

    progress.completedModules.push(moduleId);
    await progress.save();

    res.json({ message: "Module marked complete", progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllModules = async (req, res) => {
  try {
    const modules = await Module.find().populate("course", "title")
    .populate("quiz");
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch modules" });
  }
};
