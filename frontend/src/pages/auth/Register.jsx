import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../features/auth/authSlice";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";

const Register = ({ switchToLogin }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, token, successMessage } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the Terms & Conditions");
      return;
    }
    dispatch(registerThunk({ fullName, email, username, password }));
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (token && user) navigate("/student");
  }, [token, user, navigate]);

  const passwordStrength = () => {
    if (password.length === 0) return { score: 0, color: "bg-gray-300", text: "Weak" };
    if (password.length < 6) return { score: 1, color: "bg-red-500", text: "Weak" };
    if (password.length < 8) return { score: 2, color: "bg-yellow-500", text: "Medium" };
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password)) {
      return { score: 4, color: "bg-green-500", text: "Strong" };
    }
    return { score: 3, color: "bg-orange-500", text: "Good" };
  };

  const strength = passwordStrength();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Join MyAcademy</h3>
        <p className="text-gray-600">Start your learning journey today</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 ">
        {/* Full Name Input */}
        <div className="space-y-2">
         
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all duration-300"
              placeholder="FullName"
              required
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all duration-300"
              placeholder="Email"
              required
            />
          </div>
        </div>

        {/* Username Input */}
        <div className="space-y-2">
         
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all duration-300"
              placeholder="User Name"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-3">
          
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all duration-300"
              placeholder="Password"
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
          disabled={loading || !agreed}
          className="w-full py-3 px-4 bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>

    
     
        {/* Toggle to Login */}
        <div className="text-center pt-4">
          <p className="text-gray-900 text-[10px] lg:text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={switchToLogin}
              className=" text-orange-600 hover:text-orange-700 transition-colors duration-300"
            >
              Sign in here
            </button>
          </p>
        </div>
      </form>

      {/* Success Message */}
      {successMessage && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-green-800 font-medium">{successMessage}</p>
          </div>
        </div>
      )}

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

export default Register;