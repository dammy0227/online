// src/pages/auth/Register.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../features/auth/authSlice";
import "./auth.css";

const Register = ({ switchToLogin }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, token, successMessage } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerThunk({ fullName, email, username, password }));
  };

  useEffect(() => {
  dispatch(clearError()); // clear previous errors
}, [dispatch]);

  useEffect(() => {
    if (token && user) navigate("/student");
  }, [token, user, navigate]);

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-wrapper">
        {/* inputs ... */}
        <input type="text" placeholder="Full Name" value={fullName} onChange={(e)=>setFullName(e.target.value)} required />
        <input type="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {/* ✅  toggle stays inside card */}
        <p className="auth-toggle-inside">
          Already have an account?{" "}
          <button type="button" className="link-btn" onClick={switchToLogin}>
            Login
          </button>
        </p>
      </form>

      {successMessage && <p className="success">{successMessage}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Register;
