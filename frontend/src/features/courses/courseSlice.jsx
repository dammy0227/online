import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllCourses,
  fetchCourseById,
  enrollCourse,
  fetchMyCourses,
  createCourseThunk,
  updateCourseThunk,
  deleteCourseThunk,
  toggleCourseLikeThunk,
} from "./courseThunks";

const initialState = {
  allCourses: [],
  myCourses: [],
  selectedCourse: null,
  loading: false,
  error: null,
  successMessage: null,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearCourseMessages: (state) => {
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

    builder
      // ===== Student Thunks =====
      .addCase(fetchAllCourses.pending, pending)
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.allCourses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, rejected)

      .addCase(fetchCourseById.pending, pending)
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, rejected)

      .addCase(enrollCourse.pending, pending)
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.myCourses.push(action.payload.progress);
      })
      .addCase(enrollCourse.rejected, rejected)

      .addCase(fetchMyCourses.pending, pending)
      .addCase(fetchMyCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.myCourses = action.payload;
      })
      .addCase(fetchMyCourses.rejected, rejected)

      // ===== Admin Thunks =====
      .addCase(createCourseThunk.pending, pending)
      .addCase(createCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.course) {
          state.allCourses.unshift(action.payload.course);
          state.successMessage =
            action.payload.message || "Course created successfully";
        } else {
          state.error = "Unexpected response: no course in payload";
        }
      })
      .addCase(createCourseThunk.rejected, rejected)

      .addCase(updateCourseThunk.pending, pending)
      .addCase(updateCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload?.course;
        if (updated) {
          const idx = state.allCourses.findIndex((c) => c._id === updated._id);
          if (idx !== -1) state.allCourses[idx] = updated;
          state.successMessage =
            action.payload.message || "Course updated successfully";
        } else {
          state.error = "Unexpected response: no course in payload";
        }
      })
      .addCase(updateCourseThunk.rejected, rejected)

      .addCase(deleteCourseThunk.pending, pending)
      .addCase(deleteCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.allCourses = state.allCourses.filter(
          (c) => c._id !== action.meta.arg
        );
        state.successMessage =
          action.payload?.message || "Course deleted successfully";
      })
      .addCase(deleteCourseThunk.rejected, rejected)

      // ===== Like Toggle =====
      .addCase(toggleCourseLikeThunk.fulfilled, (state, action) => {
        const { liked, likesCount } = action.payload;
        const courseId = action.meta.arg;

        const idx = state.allCourses.findIndex((c) => c._id === courseId);
        if (idx !== -1) {
          state.allCourses[idx].liked = liked;
          state.allCourses[idx].likesCount = likesCount;
        }

        if (state.selectedCourse?._id === courseId) {
          state.selectedCourse.liked = liked;
          state.selectedCourse.likesCount = likesCount;
        }
      })
      .addCase(toggleCourseLikeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to toggle like";
      });
  },
});

export const { clearCourseMessages } = courseSlice.actions;
export default courseSlice.reducer;
