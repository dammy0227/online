// src/services/progressApi.js
import API from "./api";

export const getMyProgress = async (courseId) => {
  const { data } = await API.get(`/progress/${courseId}`);
  return data;
};

export const updateProgress = async (courseId, progressData) => {
  const { data } = await API.put(`/progress/${courseId}`, progressData);
  return data;
};

export const getSubmittedQuizzes = async (courseId) => {
  const { data } = await API.get(`/progress/${courseId}/quizzes`);
  return data;
};