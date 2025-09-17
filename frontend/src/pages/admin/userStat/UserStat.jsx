// src/pages/admin/UserStat.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStatsThunk } from "../../../features/admin/adminThunks";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./UserStat.css";

const UserStat = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUserStatsThunk());
  }, [dispatch]);

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!stats) return <p>No stats available</p>;

  // Prepare chart data
  const chartData = [
    { name: "Students", value: stats.totalStudents },
    { name: "Admins", value: stats.totalAdmins },
    { name: "Courses", value: stats.totalCourses },
    { name: "Enrollments", value: stats.totalEnrollments },
    { name: "Engagement (%)", value: stats.engagementRate },
  ];

  return (
    <div className="stats-container">
      <h1>Platform Statistics</h1>

      {/* Boxes */}
      <div className="stats-boxes">
        <div className="stat-box">
          <h2>Total Students</h2>
          <p>{stats.totalStudents}</p>
        </div>
        <div className="stat-box">
          <h2>Total Admins</h2>
          <p>{stats.totalAdmins}</p>
        </div>
        <div className="stat-box">
          <h2>Total Courses</h2>
          <p>{stats.totalCourses}</p>
        </div>
        <div className="stat-box">
          <h2>Total Enrollments</h2>
          <p>{stats.totalEnrollments}</p>
        </div>
        <div className="stat-box">
          <h2>Engagement Rate</h2>
          <p>{stats.engagementRate.toFixed(2)}%</p>
        </div>
      </div>

      {/* Chart */}
      <div className="stats-chart">
        <h2>Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6a0dad" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserStat;
