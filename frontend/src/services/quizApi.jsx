// src/services/quizApi.js
import API from "./api"; // Axios instance

// --------------------
// STUDENT API
// --------------------

// Submit quiz answers
export const submitQuiz = async (quizId, { answers, courseId }) => {
  const { data } = await API.post(`/quizzes/${quizId}/submit`, { answers, courseId });
  return data;
};

// Get quiz results (for review)
export const getQuizResults = async (quizId) => {
  const { data } = await API.get(`/quizzes/${quizId}`);
  return data;
};

// Get quizzes by module (for students)
export const getQuizzesByModule = async (moduleId) => {
  const { data } = await API.get(`/quizzes/module/${moduleId}`);
  return data;
};

// --------------------
// ADMIN API
// --------------------

// Get all quizzes (admin)
export const getAllQuizzes = async () => {
  const { data } = await API.get(`/quizzes/all`);
  return data;
};
