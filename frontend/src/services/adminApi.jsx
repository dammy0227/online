import API from "./api";

// ----------------------
// COURSES
export const createCourse = async (formData) => {
  const { data } = await API.post("/admin/courses", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateCourse = async (courseId, formData) => {
  const { data } = await API.put(`/admin/courses/${courseId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteCourse = async (courseId) => {
  const { data } = await API.delete(`/admin/courses/${courseId}`);
  return data;
};

// ----------------------
// QUIZZES
export const addQuiz = async (moduleId, quizData) => {
  const { data } = await API.post(`/admin/modules/${moduleId}/quizzes`, quizData);
  return data;
};

export const updateQuiz = async (quizId, quizData) => {
  const { data } = await API.put(`/admin/quizzes/${quizId}`, quizData);
  return data;
};

export const deleteQuiz = async (quizId) => {
  const { data } = await API.delete(`/admin/quizzes/${quizId}`);
  return data;
};

// ----------------------
// STATS
export const getUserStats = async () => {
  const { data } = await API.get("/admin/stats");
  return data;
};
