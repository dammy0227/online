import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyProgress, updateProgress } from "../../services/progressApi";
import { getSubmittedQuizzes } from "../../services/progressApi";


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


export const updateMyProgress = createAsyncThunk(
  "progress/updateMyProgress",
  async ({ courseId, progressData }, { rejectWithValue }) => {
    try {
      const response = await updateProgress(courseId, progressData);
      return response.progress; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const fetchSubmittedQuizzes = createAsyncThunk(
  "progress/fetchSubmittedQuizzes",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await getSubmittedQuizzes(courseId);
      return response; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
