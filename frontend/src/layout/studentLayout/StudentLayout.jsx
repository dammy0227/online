import React, { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import "./StudentLayout.css";

const StudentLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="student-layout">
      <header className="student-container">
        <h2 className="navbar-title">Student Dashboard</h2>

        {/* Hamburger / Close icon */}
        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        {/* Nav Links */}
        <nav className={`student-links ${menuOpen ? "show" : ""}`}>
          <NavLink
            to="/student/courses"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Browse Courses
          </NavLink>
          <NavLink
            to="/student/my-progress"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            My Progress
          </NavLink>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
