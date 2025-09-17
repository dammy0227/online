// src/services/authApi.js
import API from "./api";

// Student registration
export const registerUser = async (userData) => {
  const { data } = await API.post("/auth/register", userData);
  return data;
};

// Login (student or admin)
export const loginUser = async (credentials) => {
  const { data } = await API.post("/auth/login", credentials);
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};
