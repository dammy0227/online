import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { user, token, loading } = useSelector((state) => state.auth);
  const [ready, setReady] = useState(false);

  // Delay protection until Redux is fully initialized
  useEffect(() => {
    if (!loading) setReady(true);
  }, [loading]);

  if (!ready) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          fontWeight: "600",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/" replace />; 
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
