import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../features/auth/authThunks";
import { useNavigate, Link } from "react-router-dom";
import { clearError } from "../../features/auth/authSlice";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ switchToRegister }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, token } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk({ identifier, password }));
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (token && user) {
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/student", { replace: true });
      }
    }
  }, [token, user, navigate]);

  return (
    <div className="space-y-">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h3>
        <p className="text-gray-600">Sign in to continue your learning journey</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email/Username Input */}
        <div className="space-y-2">
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all duration-300"
              placeholder="Email or UserName"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all duration-300"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>

      

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>

    

        {/* Toggle to Register */}
        <div className="text-center pt-4">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={switchToRegister}
              className=" text-orange-600 hover:text-orange-700 transition-colors duration-300"
            >
              Create one now
            </button>
          </p>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;