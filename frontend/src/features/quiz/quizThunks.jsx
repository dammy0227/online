// src/features/quiz/quizThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  submitQuiz,
  getQuizResults,
  getQuizzesByModule,
  getAllQuizzes,
} from "../../services/quizApi";
import { addQuiz, updateQuiz, deleteQuiz } from "../../services/adminApi";

// ----------------------
// STUDENT QUIZ THUNKS
// ----------------------

// Submit quiz answers
export const submitQuizAnswers = createAsyncThunk(
  "quiz/submitQuizAnswers",
  async ({ quizId, answers, courseId }, { rejectWithValue }) => {
    try {
      const response = await submitQuiz(quizId, { answers, courseId });
      return response; // { result, progress, submittedQuizId, message }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch quiz results (for review)
export const fetchQuizResults = createAsyncThunk(
  "quiz/fetchQuizResults",
  async (quizId, { rejectWithValue }) => {
    try {
      const response = await getQuizResults(quizId);
      return response; // quiz questions for review
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch quizzes by module (student)
export const fetchQuizzesByModule = createAsyncThunk(
  "quiz/fetchQuizzesByModule",
  async (moduleId, { rejectWithValue }) => {
    try {
      const response = await getQuizzesByModule(moduleId);
      return { moduleId, quizzes: response };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ----------------------
// ADMIN QUIZ THUNKS
// ----------------------

export const addQuizThunk = createAsyncThunk(
  "quiz/addQuiz",
  async ({ moduleId, quizData }, { rejectWithValue }) => {
    try {
      return await addQuiz(moduleId, quizData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add quiz");
    }
  }
);

export const updateQuizThunk = createAsyncThunk(
  "quiz/updateQuiz",
  async ({ quizId, quizData }, { rejectWithValue }) => {
    try {
      return await updateQuiz(quizId, quizData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update quiz");
    }
  }
);

export const deleteQuizThunk = createAsyncThunk(
  "quiz/deleteQuiz",
  async (quizId, { rejectWithValue }) => {
    try {
      return await deleteQuiz(quizId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete quiz");
    }
  }
);

export const fetchAllQuizzes = createAsyncThunk(
  "quiz/fetchAllQuizzes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllQuizzes();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
