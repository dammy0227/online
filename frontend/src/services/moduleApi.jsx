// src/api/moduleApi.jsx
import API from "./api";

// ----------------------
// STUDENT & ADMIN MODULES
// ----------------------

// 🔹 Get all modules (admin or student)
export const getAllModules = async () => {
  // ModuleRoutes GET "/" → /api/modules/
  const { data } = await API.get("/modules");
  return data;
};

// 🔹 Get modules by course (admin)
export const getModulesByCourse = async (courseId) => {
  // AdminRoutes GET "/courses/:courseId/modules"
  const { data } = await API.get(`/admin/courses/${courseId}/modules`);
  return data;
};

// 🔹 Add module (admin)
export const addModule = async (courseId, formData) => {
  const { data } = await API.post(`/admin/courses/${courseId}/modules`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// 🔹 Update module (admin)
export const updateModule = async (moduleId, formData) => {
  const { data } = await API.put(`/admin/modules/${moduleId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// 🔹 Delete module (admin)
export const deleteModule = async (moduleId) => {
  const { data } = await API.delete(`/admin/modules/${moduleId}`);
  return { ...data, moduleId }; // include ID for reducer
};

// ----------------------
// STUDENT MODULE INTERACTIONS
// ----------------------

// 🔹 Get module content (text/video)
export const getModuleContent = async (moduleId) => {
  const { data } = await API.get(`/modules/${moduleId}`);
  return data;
};

// 🔹 Mark module as complete (student)
export const markModuleComplete = async (moduleId, { courseId }) => {
  const { data } = await API.post(`/modules/${moduleId}/complete`, { courseId });
  return data;
};
