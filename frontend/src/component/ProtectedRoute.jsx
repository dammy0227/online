import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { user, token, loading } = useSelector((state) => state.auth);

  // 🔹 Wait until Redux finishes initializing (to prevent blinking/redirect loop)
  if (loading) {
    return <div>Loading...</div>;
  }

  // 🔹 If no user/token, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 🔹 Role-based protection
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
