// src/services/api.js
import axios from "axios";

// Adjust to your backend URL
const API = axios.create({
  baseURL: "https://online-zqrr.onrender.com/api",
  headers: { 'Content-Type': 'application/json' }
});

// Attach token (if exists) to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // token stored on login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
