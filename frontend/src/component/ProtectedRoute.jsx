import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * ProtectedRoute component
 * @param {ReactNode} children - The component to render if authorized
 * @param {string} role - Optional role to restrict access (e.g., "admin" or "student")
 */
const ProtectedRoute = ({ children, role }) => {
  const { user, token } = useSelector((state) => state.auth);

  if (!token || !user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    // Logged in but wrong role
    return <Navigate to="/" replace />;
  }

  // Authorized
  return children;
};

export default ProtectedRoute;
