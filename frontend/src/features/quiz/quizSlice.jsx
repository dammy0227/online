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
  results: null,                
  reviewQuiz: null,             
  quizzes: [],                  
  moduleQuizzes: {},            
  progress: null,               
  submittedQuizzes: [],         
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
      /* ==================== FETCH MODULE QUIZZES ==================== */
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

      /* ==================== SUBMIT QUIZ ==================== */
      .addCase(submitQuizAnswers.pending, (state) => {
        state.loadingAdd = true;
        state.error = null;
      })
      .addCase(submitQuizAnswers.fulfilled, (state, action) => {
        state.loadingAdd = false;

        const { result, progress, submittedQuizId, message } = action.payload;

        // Update results for immediate feedback
        state.results = {
          score: result.score,
          total: result.total,
          correctAnswers: result.correctAnswers,
          submittedQuizId,
          message,
        };

        // Update progress
        state.progress = progress;

        // Create a full submission object for UI
        const newSubmission = {
          quiz: submittedQuizId,
          score: result.score,
          details: result.correctAnswers.map((c) => ({
            question: c.question,
            userAnswer: c.userAnswer,
            correct: c.correct,
            isCorrect: c.isCorrect,
          })),
        };

        // Check if quiz already exists in submittedQuizzes
        const existingIndex = state.submittedQuizzes.findIndex(
          (s) => s.quiz === submittedQuizId
        );

        if (existingIndex === -1) {
          state.submittedQuizzes.push(newSubmission);
        } else {
          state.submittedQuizzes[existingIndex] = newSubmission;
        }
      })
      .addCase(submitQuizAnswers.rejected, (state, action) => {
        state.loadingAdd = false;
        state.error = action.payload || action.error.message;
      });

    /* ==================== FETCH ALL QUIZZES ==================== */
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

      /* ==================== ADD QUIZ ==================== */
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

      /* ==================== UPDATE QUIZ ==================== */
      .addCase(updateQuizThunk.pending, (state) => {
        state.loadingUpdate = true;
        state.error = null;
      })
      .addCase(updateQuizThunk.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        const index = state.quizzes.findIndex(
          (q) => q._id === action.payload._id
        );
        if (index !== -1) state.quizzes[index] = action.payload;
        state.successMessage = "Quiz updated successfully";
      })
      .addCase(updateQuizThunk.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.error = action.payload || action.error.message;
      })

      /* ==================== DELETE QUIZ ==================== */
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
