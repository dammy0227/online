import React from "react";
import { Outlet } from "react-router-dom";
import StudentLayout from "../../../layout/studentLayout/StudentLayout";

const StudentDashboard = () => {
  return (
    <StudentLayout>
      <Outlet /> {/* Nested routes appear here */}
    </StudentLayout>
  );
};

export default StudentDashboard;
