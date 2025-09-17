import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };


  return (
    <div className="admin-layout">
      {/* Navbar */}
      <header className="admin-container">
        <h2 className="sidebar-title">Admin Panel</h2>

        {/* Desktop nav links */}
<nav className="nav-links">
  <NavLink 
    to="/admin/manage-courses" 
    end
    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
  >
    Manage Courses
  </NavLink>
  <NavLink 
    to="/admin/manage-modules" 
    end
    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
  >
    Manage Modules
  </NavLink>
  <NavLink 
    to="/admin/manage-quizzes" 
    end
    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
  >
    Manage Quizzes
  </NavLink>
  <NavLink 
    to="/admin/user-stats" 
    end
    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
  >
    User Stats
  </NavLink>
  <button className="logout-btn" onClick={handleLogout}>Logout</button>
</nav>


      </header>

      {/* Main Content */}
      <main className="main-content">{children}</main>
    </div>
  );
};

export default AdminLayout;
