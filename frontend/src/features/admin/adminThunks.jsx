import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  getUserStats,
} from "../../services/adminApi";

// ----------------------
// COURSES
export const createCourseThunk = createAsyncThunk(
  "admin/createCourse",
  async (formData, { rejectWithValue }) => {
    try {
      return await createCourse(formData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create course");
    }
  }
);

export const updateCourseThunk = createAsyncThunk(
  "admin/updateCourse",
  async ({ courseId, formData }, { rejectWithValue }) => {
    try {
      return await updateCourse(courseId, formData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update course");
    }
  }
);

export const deleteCourseThunk = createAsyncThunk(
  "admin/deleteCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      return await deleteCourse(courseId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete course");
    }
  }
);

// ----------------------
// QUIZZES
export const addQuizThunk = createAsyncThunk(
  "admin/addQuiz",
  async ({ moduleId, quizData }, { rejectWithValue }) => {
    try {
      return await addQuiz(moduleId, quizData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add quiz");
    }
  }
);

export const updateQuizThunk = createAsyncThunk(
  "admin/updateQuiz",
  async ({ quizId, quizData }, { rejectWithValue }) => {
    try {
      return await updateQuiz(quizId, quizData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update quiz");
    }
  }
);

export const deleteQuizThunk = createAsyncThunk(
  "admin/deleteQuiz",
  async (quizId, { rejectWithValue }) => {
    try {
      return await deleteQuiz(quizId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete quiz");
    }
  }
);

// ----------------------
// STATS
export const getUserStatsThunk = createAsyncThunk(
  "admin/getUserStats",
  async (_, { rejectWithValue }) => {
    try {
      return await getUserStats();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch stats");
    }
  }
);
