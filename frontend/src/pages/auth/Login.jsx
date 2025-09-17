import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../features/auth/authThunks";
import { useNavigate, Link } from "react-router-dom";
import { clearError } from "../../features/auth/authSlice";
import './auth.css'

const Login = ({ switchToRegister }) => {
  const [identifier, setIdentifier] = useState(""); // can be email or username
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user, token } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk({ identifier, password }));
  };

  useEffect(() => {
  dispatch(clearError()); // clear previous errors
}, [dispatch]);

  // Redirect after login
  useEffect(() => {
    if (token && user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    }
  }, [token, user, navigate]);

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-wrapper">
        {/* inputs ... */}
        <input type="text" placeholder="Email or Username" value={identifier} onChange={(e)=>setIdentifier(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* ✅ inside the card */}
        <p className="auth-toggle-inside">
          Don’t have an account?{" "}
          <button type="button" className="link-btn" onClick={switchToRegister}>
            Register
          </button>
        </p>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
