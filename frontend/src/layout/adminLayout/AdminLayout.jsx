import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="admin-layout">
      {/* Header */}
      <header className="admin-container">
        <div className="admin-top">
          <h2 className="admin-sidebar-title">Admin Panel</h2>

          {/* Hamburger / Close icon */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Nav Links */}
        <nav
          className={`admin-nav-links ${mobileMenuOpen ? "open" : ""}`}
        >
          <NavLink
            to="/admin/manage-courses"
            end
            className={({ isActive }) =>
              isActive ? "admin-nav-link admin-active" : "admin-nav-link"
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Manage Courses
          </NavLink>
          <NavLink
            to="/admin/manage-modules"
            end
            className={({ isActive }) =>
              isActive ? "admin-nav-link admin-active" : "admin-nav-link"
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Manage Modules
          </NavLink>
          <NavLink
            to="/admin/manage-quizzes"
            end
            className={({ isActive }) =>
              isActive ? "admin-nav-link admin-active" : "admin-nav-link"
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Manage Quizzes
          </NavLink>
          <NavLink
            to="/admin/user-stats"
            end
            className={({ isActive }) =>
              isActive ? "admin-nav-link admin-active" : "admin-nav-link"
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            User Stats
          </NavLink>
          <button
            className="admin-logout-btn"
            onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="admin-main-content">{children}</main>
    </div>
  );
};

export default AdminLayout;
