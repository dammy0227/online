import { createSlice } from "@reduxjs/toolkit";
import {
  createCourseThunk,
  updateCourseThunk,
  deleteCourseThunk,
  addQuizThunk,
  updateQuizThunk,
  deleteQuizThunk,
  getUserStatsThunk,
} from "./adminThunks";

const initialState = {
  courses: [],
  quizzes: [],
  stats: null,
  loading: false,
  error: null,
  successMessage: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    };
    const rejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    };

    // COURSES
    builder
      .addCase(createCourseThunk.pending, pending)
      .addCase(createCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.course) {
          state.courses.push(action.payload.course);
          state.successMessage = action.payload.message || "Course created successfully";
        } else {
          state.error = "Unexpected response: no course in payload";
        }
      })
      .addCase(createCourseThunk.rejected, rejected)

      .addCase(updateCourseThunk.pending, pending)
      .addCase(updateCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.course) {
          const idx = state.courses.findIndex((c) => c._id === action.payload.course._id);
          if (idx !== -1) state.courses[idx] = action.payload.course;
          state.successMessage = action.payload.message || "Course updated successfully";
        } else {
          state.error = "Unexpected response: no course in payload";
        }
      })
      .addCase(updateCourseThunk.rejected, rejected)

      .addCase(deleteCourseThunk.pending, pending)
      .addCase(deleteCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter((c) => c._id !== action.meta.arg);
        state.successMessage = action.payload?.message || "Course deleted successfully";
      })
      .addCase(deleteCourseThunk.rejected, rejected);

    // QUIZZES
    builder
      .addCase(addQuizThunk.pending, pending)
      .addCase(addQuizThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.quiz) {
          state.quizzes.push(action.payload.quiz);
          state.successMessage = action.payload.message || "Quiz added successfully";
        } else {
          state.error = "Unexpected response: no quiz in payload";
        }
      })
      .addCase(addQuizThunk.rejected, rejected)

      .addCase(updateQuizThunk.pending, pending)
      .addCase(updateQuizThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.quiz) {
          const idx = state.quizzes.findIndex((q) => q._id === action.payload.quiz._id);
          if (idx !== -1) state.quizzes[idx] = action.payload.quiz;
          state.successMessage = action.payload.message || "Quiz updated successfully";
        } else {
          state.error = "Unexpected response: no quiz in payload";
        }
      })
      .addCase(updateQuizThunk.rejected, rejected)

      .addCase(deleteQuizThunk.pending, pending)
      .addCase(deleteQuizThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = state.quizzes.filter((q) => q._id !== action.meta.arg);
        state.successMessage = action.payload?.message || "Quiz deleted successfully";
      })
      .addCase(deleteQuizThunk.rejected, rejected);

    // STATS
    builder
      .addCase(getUserStatsThunk.pending, pending)
      .addCase(getUserStatsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload || null;
      })
      .addCase(getUserStatsThunk.rejected, rejected);
  },
});

export const { clearAdminMessages } = adminSlice.actions;
export default adminSlice.reducer;
