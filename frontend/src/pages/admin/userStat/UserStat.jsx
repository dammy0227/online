// src/pages/admin/UserStat.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStatsThunk } from "../../../features/admin/adminThunks";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaUserGraduate,
  FaUserShield,
  FaBook,
  FaClipboardList,
  FaChartLine,
} from "react-icons/fa";
import "./UserStat.css";

const UserStat = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUserStatsThunk());
  }, [dispatch]);

  if (loading) return <p className="loading">Loading dashboard...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!stats) return <p>No stats available</p>;

  const chartData = [
    { name: "Students", value: stats.totalStudents },
    { name: "Admins", value: stats.totalAdmins },
    { name: "Courses", value: stats.totalCourses },
    { name: "Enrollments", value: stats.totalEnrollments },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* KPI CARDS */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <FaUserGraduate className="kpi-icon" />
          <div>
            <p>Total Students</p>
            <h2>{stats.totalStudents}</h2>
          </div>
        </div>

        <div className="kpi-card">
          <FaUserShield className="kpi-icon" />
          <div>
            <p>Total Admins</p>
            <h2>{stats.totalAdmins}</h2>
          </div>
        </div>

        <div className="kpi-card">
          <FaBook className="kpi-icon" />
          <div>
            <p>Total Courses</p>
            <h2>{stats.totalCourses}</h2>
          </div>
        </div>

        <div className="kpi-card">
          <FaClipboardList className="kpi-icon" />
          <div>
            <p>Total Enrollments</p>
            <h2>{stats.totalEnrollments}</h2>
          </div>
        </div>

        <div className="kpi-card">
          <FaChartLine className="kpi-icon" />
          <div>
            <p>Engagement Rate</p>
            <h2>{stats.engagementRate.toFixed(1)}%</h2>
          </div>
        </div>
      </div>

      {/* CHART + TABLE */}
      <div className="dashboard-grid">
        {/* Chart */}
        <div className="card">
          <h3>Platform Overview</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6a0dad" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Table */}
        <div className="card">
          <h3>Statistics Summary</h3>
          <table className="stats-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Students</td>
                <td>{stats.totalStudents}</td>
              </tr>
              <tr>
                <td>Total Admins</td>
                <td>{stats.totalAdmins}</td>
              </tr>
              <tr>
                <td>Total Courses</td>
                <td>{stats.totalCourses}</td>
              </tr>
              <tr>
                <td>Total Enrollments</td>
                <td>{stats.totalEnrollments}</td>
              </tr>
              <tr className="highlight-row">
                <td>Engagement Rate</td>
                <td>{stats.engagementRate.toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserStat;
