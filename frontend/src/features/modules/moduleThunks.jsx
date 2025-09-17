import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getModuleContent,
  markModuleComplete,
  getAllModules,
  getModulesByCourse,
  addModule,
  updateModule,
  deleteModule,
} from "../../services/moduleApi";

// ----------------------
// Student Actions
// ----------------------
export const fetchModuleContent = createAsyncThunk(
  "modules/fetchContent",
  async (moduleId, { rejectWithValue }) => {
    try {
      return await getModuleContent(moduleId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const completeModule = createAsyncThunk(
  "modules/complete",
  async ({ moduleId, courseId }, { rejectWithValue }) => {
    try {
      return await markModuleComplete(moduleId, { courseId });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ----------------------
// Admin Module Actions
// ----------------------
export const getAllModulesThunk = createAsyncThunk(
  "modules/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllModules();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch modules");
    }
  }
);

export const getModulesByCourseThunk = createAsyncThunk(
  "modules/getByCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      return await getModulesByCourse(courseId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch modules by course");
    }
  }
);

export const addModuleThunk = createAsyncThunk(
  "modules/add",
  async ({ courseId, formData }, { rejectWithValue }) => {
    try {
      return await addModule(courseId, formData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add module");
    }
  }
);

export const updateModuleThunk = createAsyncThunk(
  "modules/update",
  async ({ moduleId, formData }, { rejectWithValue }) => {
    try {
      return await updateModule(moduleId, formData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update module");
    }
  }
);

export const deleteModuleThunk = createAsyncThunk(
  "modules/delete",
  async (moduleId, { rejectWithValue }) => {
    try {
      return await deleteModule(moduleId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete module");
    }
  }
);
