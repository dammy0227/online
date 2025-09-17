import { createSlice } from "@reduxjs/toolkit";
import {
  fetchModuleContent,
  completeModule,
  getAllModulesThunk,
  getModulesByCourseThunk,
  addModuleThunk,
  updateModuleThunk,
  deleteModuleThunk,
} from "./moduleThunks";

const initialState = {
  modules: [],
  currentModule: null,
  loading: false,
  error: null,
  successMessage: null,
};

const moduleSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    clearModuleMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    clearCurrentModule: (state) => {
      state.currentModule = null;
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
      // Fetch all modules
      .addCase(getAllModulesThunk.pending, pending)
      .addCase(getAllModulesThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Expecting API to return an array of modules
        state.modules = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllModulesThunk.rejected, rejected)

      // Fetch modules by course
      .addCase(getModulesByCourseThunk.pending, pending)
      .addCase(getModulesByCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.modules = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getModulesByCourseThunk.rejected, rejected)

      // Add module
      .addCase(addModuleThunk.pending, pending)
      .addCase(addModuleThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.module) state.modules.unshift(action.payload.module);
        state.successMessage = action.payload?.message || "Module added successfully";
      })
      .addCase(addModuleThunk.rejected, rejected)

      // Update module
      .addCase(updateModuleThunk.pending, pending)
      .addCase(updateModuleThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.module) {
          const idx = state.modules.findIndex((m) => m._id === action.payload.module._id);
          if (idx !== -1) state.modules[idx] = action.payload.module;
        }
        state.successMessage = action.payload?.message || "Module updated successfully";
      })
      .addCase(updateModuleThunk.rejected, rejected)

      // Delete module
      .addCase(deleteModuleThunk.pending, pending)
      .addCase(deleteModuleThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.moduleId) {
          state.modules = state.modules.filter((m) => m._id !== action.payload.moduleId);
        }
        state.successMessage = action.payload?.message || "Module deleted successfully";
      })
      .addCase(deleteModuleThunk.rejected, rejected)

      // Fetch module content
      .addCase(fetchModuleContent.pending, pending)
      .addCase(fetchModuleContent.fulfilled, (state, action) => {
        state.loading = false;
        state.currentModule = action.payload || null;
      })
      .addCase(fetchModuleContent.rejected, rejected)

      // Complete module
      .addCase(completeModule.pending, pending)
      .addCase(completeModule.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || "Module completed successfully";
      })
      .addCase(completeModule.rejected, rejected);
  },
});

export const { clearModuleMessages, clearCurrentModule } = moduleSlice.actions;
export default moduleSlice.reducer;
