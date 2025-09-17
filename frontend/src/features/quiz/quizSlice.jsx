// src/features/quiz/quizSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllQuizzes,
  fetchQuizzesByModule,
  addQuizThunk,
  updateQuizThunk,
  deleteQuizThunk,
  submitQuizAnswers,
} from "./quizThunks";

const initialState = {
  results: null,                // last submitted quiz result
  reviewQuiz: null,             // quiz data for review
  quizzes: [],                  // admin/global list
  moduleQuizzes: {},            // student view: quizzes by moduleId
  progress: null,               // student's course progress
  submittedQuizzes: [],         // array of quiz IDs already submitted
  loadingFetch: false,
  loadingAdd: false,
  loadingUpdate: false,
  loadingDelete: false,
  error: null,
  successMessage: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    clearQuizState: (state) => {
      state.results = null;
      state.reviewQuiz = null;
      state.error = null;
      state.successMessage = null;
    },
    clearResults: (state) => {
      state.results = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ------------------------
      // Fetch quizzes by module
      // ------------------------
      .addCase(fetchQuizzesByModule.pending, (state) => {
        state.loadingFetch = true;
        state.error = null;
      })
      .addCase(fetchQuizzesByModule.fulfilled, (state, action) => {
        state.loadingFetch = false;
        const { moduleId, quizzes } = action.payload;
        state.moduleQuizzes[moduleId] = quizzes;
      })
      .addCase(fetchQuizzesByModule.rejected, (state, action) => {
        state.loadingFetch = false;
        state.error = action.payload || action.error.message;
      })

      // ------------------------
      // Submit quiz answers
      // ------------------------
      .addCase(submitQuizAnswers.pending, (state) => {
        state.loadingAdd = true;
        state.error = null;
      })
      .addCase(submitQuizAnswers.fulfilled, (state, action) => {
        state.loadingAdd = false;

        const { result, progress, submittedQuizId, message } = action.payload;

        // Save result for display
        state.results = {
          score: result.score,
          total: result.total,
          correctAnswers: result.correctAnswers,
          submittedQuizId,
          message,
        };

        // Update student progress
        state.progress = progress;

        // Track submitted quizzes
        if (!state.submittedQuizzes.includes(submittedQuizId)) {
          state.submittedQuizzes.push(submittedQuizId);
        }
      })
      .addCase(submitQuizAnswers.rejected, (state, action) => {
        state.loadingAdd = false;
        state.error = action.payload || action.error.message;
      });

    // ------------------------
    // Admin actions: add/update/delete/fetch all
    // ------------------------
    builder
      .addCase(fetchAllQuizzes.pending, (state) => {
        state.loadingFetch = true;
        state.error = null;
      })
      .addCase(fetchAllQuizzes.fulfilled, (state, action) => {
        state.loadingFetch = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchAllQuizzes.rejected, (state, action) => {
        state.loadingFetch = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(addQuizThunk.pending, (state) => {
        state.loadingAdd = true;
        state.error = null;
      })
      .addCase(addQuizThunk.fulfilled, (state, action) => {
        state.loadingAdd = false;
        state.quizzes.push(action.payload);
        state.successMessage = "Quiz created successfully";
      })
      .addCase(addQuizThunk.rejected, (state, action) => {
        state.loadingAdd = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(updateQuizThunk.pending, (state) => {
        state.loadingUpdate = true;
        state.error = null;
      })
      .addCase(updateQuizThunk.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        const index = state.quizzes.findIndex((q) => q._id === action.payload._id);
        if (index !== -1) state.quizzes[index] = action.payload;
        state.successMessage = "Quiz updated successfully";
      })
      .addCase(updateQuizThunk.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(deleteQuizThunk.pending, (state) => {
        state.loadingDelete = true;
        state.error = null;
      })
      .addCase(deleteQuizThunk.fulfilled, (state, action) => {
        state.loadingDelete = false;
        state.quizzes = state.quizzes.filter((q) => q._id !== action.payload);
        state.successMessage = "Quiz deleted successfully";
      })
      .addCase(deleteQuizThunk.rejected, (state, action) => {
        state.loadingDelete = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearQuizState, clearResults } = quizSlice.actions;
export default quizSlice.reducer;
