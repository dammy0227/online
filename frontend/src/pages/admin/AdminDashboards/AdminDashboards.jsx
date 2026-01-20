import React from 'react'
import { Outlet } from "react-router-dom";
import AdminLayout from "../../../layout/adminLayout/AdminLayout";

const AdminDashboards = () => {
  return (
    <div>
        <AdminLayout>
      <Outlet /> 
    </AdminLayout>
    </div>
  )
}

export default AdminDashboards
