import { createSlice } from "@reduxjs/toolkit";
import { fetchMyProgress, fetchSubmittedQuizzes } from "./progressThunks";
import { completeModule } from "../modules/moduleThunks";

// Normalize completedModules to array of string IDs
const normalizeProgress = (progress) => {
  if (!progress) return null;
  return {
    ...progress,
    completedModules: progress.completedModules?.map((m) =>
      typeof m === "object" ? m._id : m
    ) || [],
  };
};

const initialState = {
  progress: null, // course progress
  submittedQuizzes: [], // for Quiz page
  stats: { quizzesTaken: 0, averageScore: 0 }, // quiz stats
  score: 0, // quiz score
  loading: false,
  error: null,
  successMessage: null,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    clearProgressMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    markModuleCompletedLocally: (state, action) => {
      if (!state.progress) return;
      const newModuleId = action.payload;
      if (!state.progress.completedModules.includes(newModuleId)) {
        state.progress.completedModules.push(newModuleId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch progress
      .addCase(fetchMyProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = normalizeProgress(action.payload);
      })
      .addCase(fetchMyProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch submitted quizzes for Quiz page
      .addCase(fetchSubmittedQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubmittedQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.submittedQuizzes = action.payload.submittedQuizzes || [];
        state.stats = action.payload.stats || { quizzesTaken: 0, averageScore: 0 };
        state.score = action.payload.score || 0;
      })
      .addCase(fetchSubmittedQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Complete Module (optimistic update)
      .addCase(completeModule.fulfilled, (state, action) => {
        state.successMessage = action.payload?.message || "Module marked complete!";
        if (action.payload?.progress) {
          state.progress = normalizeProgress(action.payload.progress);
        }
      })
      .addCase(completeModule.rejected, (state, action) => {
        state.error = action.payload || "Failed to complete module";
      });
  },
});

export const { clearProgressMessages, markModuleCompletedLocally } = progressSlice.actions;
export default progressSlice.reducer;
