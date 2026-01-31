// src/pages/admin/UserStat.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStatsThunk } from "../../../features/admin/adminThunks";
import { logout } from "../../../features/auth/authSlice";
import {  useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  FaUserGraduate,
  FaUserShield,
  FaBook,
  FaClipboardList,
  FaChartLine,
  FaUsers,
  FaSpinner,
  FaExclamationCircle,
  FaArrowUp,
  FaArrowDown,
  FaCalendar,
  FaGraduationCap,
  FaEye,
  FaUserCheck,
  FaDownload,
  FaSignOutAlt
} from "react-icons/fa";
import { motion } from "framer-motion";

const UserStat = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.admin);

    const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getUserStatsThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-4xl text-amber-500 animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Loading dashboard...</h3>
          <p className="text-gray-500">Fetching platform statistics</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <FaExclamationCircle className="text-4xl text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => dispatch(getUserStatsThunk())}
            className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <FaExclamationCircle className="text-4xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">No Statistics Available</h3>
          <p className="text-gray-500">Platform statistics are currently unavailable</p>
        </div>
      </div>
    );
  }

  // Prepare data for charts
  const platformData = [
    { name: "Jan", students: 4000, enrollments: 2400, revenue: 2400 },
    { name: "Feb", students: 3000, enrollments: 1398, revenue: 2210 },
    { name: "Mar", students: 2000, enrollments: 9800, revenue: 2290 },
    { name: "Apr", students: 2780, enrollments: 3908, revenue: 2000 },
    { name: "May", students: 1890, enrollments: 4800, revenue: 2181 },
    { name: "Jun", students: 2390, enrollments: 3800, revenue: 2500 },
  ];

  const engagementData = [
    { name: "Active Users", value: stats.engagementRate, color: "#10b981" },
    { name: "Inactive Users", value: 100 - stats.engagementRate, color: "#ef4444" },
  ];

  const userActivityData = [
    { time: "9:00", active: 400, new: 240 },
    { time: "12:00", active: 300, new: 139 },
    { time: "15:00", active: 200, new: 980 },
    { time: "18:00", active: 278, new: 390 },
    { time: "21:00", active: 189, new: 480 },
    { time: "24:00", active: 239, new: 380 },
  ];

  const COLORS = ["#f59e0b", "#ef4444", "#3b82f6", "#10b981", "#8b5cf6"];

  // Calculate growth rates
  const studentGrowth = 12.5;
  const courseGrowth = 8.3;
  const enrollmentGrowth = 15.7;

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">

         <div className="hidden lg:block fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-30">
          <div className="h-full px-14 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-700">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, Admin! Here's what's happening today.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-xl">
                <div className="w-8 h-8 bg-linear-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
                title="Logout"
              >
                <FaSignOutAlt className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2 md:mt-10 mb-4">
          <p></p>
          
          <div className="flex  gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200">
              <FaCalendar className="text-gray-500" />
              <span className="text-gray-700">Last updated: Today</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <FaDownload className="text-gray-600" />
              <span className="text-gray-700">Export</span>
            </button>
          </div>
          
        </div>
      </div>

      {/* KPI Cards - Compact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-md  border border-gray-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <FaUserGraduate className="text-lg text-amber-600" />
            </div>
            <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${studentGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {studentGrowth >= 0 ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
              {Math.abs(studentGrowth)}%
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{stats.totalStudents.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Total Students</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-md  border border-gray-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <FaUserShield className="text-lg text-red-600" />
            </div>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              Admin
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{stats.totalAdmins.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Administrators</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-4 rounded-md  border border-gray-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaBook className="text-lg text-blue-600" />
            </div>
            <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${courseGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {courseGrowth >= 0 ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
              {Math.abs(courseGrowth)}%
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{stats.totalCourses.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Active Courses</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-4 rounded-md  border border-gray-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <FaClipboardList className="text-lg text-green-600" />
            </div>
            <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${enrollmentGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {enrollmentGrowth >= 0 ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
              {Math.abs(enrollmentGrowth)}%
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{stats.totalEnrollments.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Total Enrollments</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-4 rounded-md  border border-gray-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FaChartLine className="text-lg text-purple-600" />
            </div>
            <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${stats.engagementRate >= 50 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {stats.engagementRate >= 50 ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
              Trend
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{stats.engagementRate.toFixed(1)}%</h3>
          <p className="text-sm text-gray-600">Engagement Rate</p>
        </motion.div>
      </div>

      {/* Charts Section - Compact Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Platform Growth Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-white p-4 rounded-xl  border border-gray-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Platform Growth Trends</h3>
              <p className="text-sm text-gray-600">Monthly performance overview</p>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-gray-500" />
              <span className="text-sm text-gray-600">6 months</span>
            </div>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="students"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="enrollments"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Engagement Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-4 rounded-xl  border border-gray-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">User Engagement</h3>
              <p className="text-sm text-gray-600">Active vs Inactive users</p>
            </div>
            <div className="flex items-center gap-2">
              <FaUserCheck className="text-gray-500" />
              <span className="text-sm text-gray-600">Today</span>
            </div>
          </div>
          <div className="h-60 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {engagementData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Activity Chart and Summary Table - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Real-time Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white p-4 rounded-xl  border border-gray-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Real-time Activity</h3>
              <p className="text-sm text-gray-600">Hourly user engagement</p>
            </div>
            <div className="flex items-center gap-2">
              <FaEye className="text-amber-500" />
              <span className="text-sm text-gray-600">Today</span>
            </div>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#666" fontSize={11} />
                <YAxis stroke="#666" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  name="Active Users"
                />
                <Line
                  type="monotone"
                  dataKey="new"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  name="New Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Stats Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-xl  border border-gray-300 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-gray-200 bg-linear-to-r from-amber-50 to-orange-50">
            <h3 className="text-lg font-semibold text-gray-800">Quick Statistics</h3>
            <p className="text-sm text-gray-600">Key metrics at a glance</p>
          </div>
          
          <div className="divide-y divide-gray-100">
            <div className="px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <FaUserGraduate className="text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Student Growth</p>
                    <p className="text-xs text-gray-500">Monthly increase</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`flex items-center gap-1 font-medium ${studentGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {studentGrowth >= 0 ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
                    {Math.abs(studentGrowth)}%
                  </span>
                  <span className="text-xs text-gray-500">vs last month</span>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaBook className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Course Completion</p>
                    <p className="text-xs text-gray-500">Average rate</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-800">78%</span>
                  <span className="text-xs text-gray-500">of enrolled students</span>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaClipboardList className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">New Enrollments</p>
                    <p className="text-xs text-gray-500">Today</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`flex items-center gap-1 font-medium ${enrollmentGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {enrollmentGrowth >= 0 ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
                    {Math.abs(enrollmentGrowth)}%
                  </span>
                  <span className="text-xs text-gray-500">from yesterday</span>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FaChartLine className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Engagement Score</p>
                    <p className="text-xs text-gray-500">Platform average</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-800">{stats.engagementRate.toFixed(1)}%</span>
                  <span className={`text-xs ${stats.engagementRate >= 50 ? 'text-green-600' : 'text-amber-600'}`}>
                    {stats.engagementRate >= 50 ? 'Excellent' : 'Needs improvement'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600">
                Last updated: Just now
              </p>
              <button
                onClick={() => dispatch(getUserStatsThunk())}
                className="flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                <FaChartLine className="text-xs" />
                Refresh
              </button>
            </div>
          </div>
        </motion.div>
      </div>

   
    </div>
  );
};

export default UserStat;