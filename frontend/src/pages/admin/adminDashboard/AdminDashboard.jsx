import React from "react";
import { Outlet } from "react-router-dom";
import AdminLayout from "../../../layout/adminLayout/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Outlet /> {/* This is where nested routes will appear */}
    </AdminLayout>
  );
};

export default AdminDashboard;
