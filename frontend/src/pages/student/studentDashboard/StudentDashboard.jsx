import React from "react";
import { Outlet } from "react-router-dom";
import StudentLayout from "../../../layout/studentLayout/StudentLayout";

const StudentDashboard = () => {
  return (
    <StudentLayout>
      <Outlet /> 
    </StudentLayout>
  );
};

export default StudentDashboard;
