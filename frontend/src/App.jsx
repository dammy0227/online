// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboards from "./pages/admin/AdminDashboards/AdminDashboards";
import StudentDashboard from "./pages/student/studentDashboard/StudentDashboard";

// Admin subpages
import ManageCourse from "./pages/admin/manageCourse/ManageCourse";
import ManageModule from "./pages/admin/manageModule/ManageModule";
import ManageQuizze from "./pages/admin/manageQuizze/ManageQuizze";
import UserStat from "./pages/admin/userStat/UserStat";

import BrowseCourses from "./pages/student/BrowseCourses/BrowseCourses";
import CourseDetail from "./pages/student/CourseDetail/CourseDetail";
import Quiz from "./pages/student/Quiz/Quiz";
import Dashboard from "./pages/student/Dashboard/Dashboard";
import MyProgress from "./pages/student/MyProgress/MyProgress";

import { Navigate } from "react-router-dom";

// Utils
import ProtectedRoute from "./component/ProtectedRoute";

import "@fontsource/poppins"; 
import "@fontsource/poppins/600.css"; 
import "./App.css";
import Layout from "./pages/student/Layout/Layout";

const App = () => {
  return ( 
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />} /> {/* 👈 Always public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin protected routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboards />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="manage-courses" replace />} />
          <Route path="manage-courses" element={<ManageCourse />} />
          <Route path="manage-modules" element={<ManageModule />} />
          <Route path="manage-quizzes" element={<ManageQuizze />} />
          <Route path="user-stats" element={<UserStat />} />
        </Route>

        {/* Student protected routes */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        >

            <Route index element={<Navigate to="courses" replace />} />
          <Route path="courses" element={<BrowseCourses />} />
          <Route path="courses/:courseId" element={<CourseDetail />} />
          <Route path="courses/:courseId/module/:moduleId/quiz" element={<Quiz />} />
          <Route path="courses/:courseId/progress" element={<Dashboard />} />
          <Route path="my-progress" element={<MyProgress />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
