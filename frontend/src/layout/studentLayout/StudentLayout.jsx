// src/layout/studentLayout/StudentLayout.jsx
import React, { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import {
  FaBars,
  FaTimes,
  FaBook,
  FaChartLine,
  FaSignOutAlt,
  FaUserGraduate,
  FaBell,
  FaCog,
  FaGraduationCap,
  FaChevronRight,
  FaSearch,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const StudentLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/student/courses?search=${encodeURIComponent(searchQuery)}`);
      setMenuOpen(false);
    }
  };

  const navItems = [
    { to: "/student/courses", label: "Browse Courses", icon: <FaBook /> },
    { to: "/student/my-progress", label: "My Progress", icon: <FaChartLine /> },
    { to: "/student/profile", label: "Profile", icon: <FaUserGraduate /> },
    { to: "/student/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="flex min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-linear-to-r from-amber-500 to-orange-500 border-gray-200 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <FaGraduationCap className="text-orange-500 text-xl" />
          </div>
          <div>
            <h1 className="font-bold text-white">Student Portal</h1>
            <p className="text-xs text-white">Learning Platform</p>
          </div>
        </div>
        <button
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={toggleMenu}
        >
           <FaBars className="text-white text-xl" />
        </button>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col
          shadow-xl lg:shadow-none
          transform ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:z-auto transition-transform duration-300 ease-in-out
          z-40
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
           <div className="lg:hidden flex justify-end mt-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes className="text-gray-600" />
            </button>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <FaGraduationCap className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Student Portal
              </h1>
              <p className="text-xs text-gray-500">Learning Management System</p>
            </div>
          </div>
         
        </div>

        {/* Navigation */}
        <nav className="flex-1 pt-4 px-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/student/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200
                ${isActive
                  ? "bg-linear-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200 shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600">
                {item.icon}
              </div>
              <span className="font-medium">{item.label}</span>
              <FaChevronRight className="ml-auto text-xs text-gray-400" />
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t mb-8 border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 
              bg-linear-to-r from-amber-500 to-orange-500 
              text-white font-semibold rounded-lg
              hover:from-amber-600 hover:to-orange-600 
              transition-all duration-200 hover:shadow-lg"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-0 lg:ml-64 h-screen overflow-auto">
        {/* Desktop Top Bar */}
        <div className="hidden lg:flex fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 z-30 items-center justify-between px-8">
          <div className="flex-1 max-w-2xl relative">
            {/* Optional search bar */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <FaBell className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-xl">
              <div className="w-8 h-8 bg-linear-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{user?.name?.charAt(0) || "S"}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{user?.name || "Student"}</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 lg:pt-20 p-4 md:p-6 lg:p-8 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
