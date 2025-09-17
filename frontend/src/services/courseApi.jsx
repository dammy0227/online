// src/services/courseApi.js
import API from "./api";

// Get all courses (public)
export const getAllCourses = async () => {
  const { data } = await API.get("/courses");
  return data;
};

// Get course details
export const getCourseById = async (courseId) => {
  const { data } = await API.get(`/courses/${courseId}`);
  return data;
};

// Enroll in a course
export const enrollInCourse = async (courseId) => {
  const { data } = await API.post(`/courses/${courseId}/enroll`);
  return data;
};

// Get my enrolled courses
export const getMyCourses = async () => {
  const { data } = await API.get("/courses/my");
  return data;
};


// ⭐ Toggle like/unlike a course
export const toggleCourseLike = async (courseId) => {
  const { data } = await API.patch(`/courses/${courseId}/toggle-like`);
  return data; // { message, liked, likesCount }
};
