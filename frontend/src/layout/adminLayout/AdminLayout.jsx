import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaBook,
  FaLayerGroup,
  FaQuestionCircle,
  FaSignOutAlt,
  FaHome,
  FaUserCog,
  FaGraduationCap,
} from "react-icons/fa";

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navItems = [
    { to: "/admin/user-stats", label: "Dashboard", icon: <FaHome /> },
    { to: "/admin/manage-courses", label: "Manage Courses", icon: <FaBook /> },
    { to: "/admin/manage-modules", label: "Manage Modules", icon: <FaLayerGroup /> },
    { to: "/admin/manage-quizzes", label: "Manage Quizzes", icon: <FaQuestionCircle /> },
    { to: "/admin/users", label: "Users", icon: <FaUserCog /> },
  ];

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 z-40 flex items-center justify-between
       px-4 bg-linear-to-r from-amber-500 to-orange-500 ">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <FaGraduationCap className="text-orange-500 text-xl" />
          </div>
          <div>
            <h1 className="font-bold text-white">EduAdmin</h1>
            <p className="text-xs text-white">Learning Platform</p>
          </div>
        </div>

        <button
          className="p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars className="text-white text-xl" />
        </button>
      </header>

      {/* ================= OVERLAY (MOBILE) ================= */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          w-64 h-screen
          bg-white border-r border-gray-200
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 transition-transform duration-300
          flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="p-2 border-b border-gray-200">
           <div className="lg:hidden flex justify-end mt-0">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <FaGraduationCap className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                EduAdmin Pro
              </h1>
              <p className="text-xs text-gray-500">Learning Management System</p>
            </div>
          </div>

         
        </div>

        {/* ================= NAV ================= */}
        <nav className="flex-1 flex flex-col p-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3 rounded-xl transition
                  ${
                    isActive
                      ? "bg-linear-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg  text-gray-600">
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>

     
          <div className="mt-auto pt-0">
            <div className="p-4 mb-7 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-linear-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">A</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Admin User</h4>
                  <p className="text-xs text-gray-500">Super Administrator</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3
                  bg-linear-to-r from-amber-500 to-orange-500
                  text-white font-semibold rounded-lg
                  hover:from-amber-600 hover:to-orange-600"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
