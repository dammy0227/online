import React from 'react'
import { Outlet } from "react-router-dom";
import AdminLayout from "../../../layout/adminLayout/AdminLayout";

const AdminDashboards = () => {
  return (
    <div>
        <AdminLayout>
      <Outlet /> {/* This is where nested routes will appear */}
    </AdminLayout>
    </div>
  )
}

export default AdminDashboards
