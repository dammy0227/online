import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyProgress, updateProgress } from "../../services/progressApi";
import { getSubmittedQuizzes } from "../../services/progressApi";

// Fetch progress for a course (dashboard)
export const fetchMyProgress = createAsyncThunk(
  "progress/fetchMyProgress",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await getMyProgress(courseId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update progress for a course
export const updateMyProgress = createAsyncThunk(
  "progress/updateMyProgress",
  async ({ courseId, progressData }, { rejectWithValue }) => {
    try {
      const response = await updateProgress(courseId, progressData);
      return response.progress; // returning updated progress object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch submitted quizzes for a course (Quiz page)
export const fetchSubmittedQuizzes = createAsyncThunk(
  "progress/fetchSubmittedQuizzes",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await getSubmittedQuizzes(courseId);
      return response; // { submittedQuizzes, stats, score }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
