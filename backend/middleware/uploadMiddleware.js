// src/middleware/uploadMiddleware.js
import multer from "multer";
import path from "path";

// Store files temporarily before Cloudinary upload
const storage = multer.diskStorage({
  destination: "uploads/", // temp folder
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|mp4|avi|mov|pdf|docx|txt/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

export const upload = multer({ storage, fileFilter });
