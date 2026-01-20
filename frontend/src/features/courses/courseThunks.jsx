import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCourses,
  getCourseById,
  enrollInCourse,
  getMyCourses,
  toggleCourseLike
} from "../../services/courseApi";
import {
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../services/adminApi";


export const fetchAllCourses = createAsyncThunk(
  "courses/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllCourses();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const fetchCourseById = createAsyncThunk(
  "courses/fetchById",
  async (courseId, { rejectWithValue }) => {
    try {
      return await getCourseById(courseId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const enrollCourse = createAsyncThunk(
  "courses/enroll",
  async (courseId, { rejectWithValue }) => {
    try {
      return await enrollInCourse(courseId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const fetchMyCourses = createAsyncThunk(
  "courses/fetchMy",
  async (_, { rejectWithValue }) => {
    try {
      return await getMyCourses();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);



export const createCourseThunk = createAsyncThunk(
  "courses/create",
  async (formData, { rejectWithValue }) => {
    try {
      return await createCourse(formData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create course");
    }
  }
);


export const updateCourseThunk = createAsyncThunk(
  "courses/update",
  async ({ courseId, formData }, { rejectWithValue }) => {
    try {
      return await updateCourse(courseId, formData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update course");
    }
  }
);

export const deleteCourseThunk = createAsyncThunk(
  "courses/delete",
  async (courseId, { rejectWithValue }) => {
    try {
      return await deleteCourse(courseId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete course");
    }
  }
);


export const toggleCourseLikeThunk = createAsyncThunk(
  "courses/toggleLike",
  async (courseId, { rejectWithValue }) => {
    try {
      return await toggleCourseLike(courseId); 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
