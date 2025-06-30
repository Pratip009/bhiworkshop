import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useAuth from "../../context/useAuth";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import SpinnerLoader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token } = res.data;

      if (!token) throw new Error("Token missing from login response");

      const decoded = jwtDecode(token);
      const userId = decoded?.id;

      if (!userId) throw new Error("Invalid token: missing user ID");

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      login(token); // optional context handler
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err.message || err);
      alert("Login failed. Check your email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-white p-6"
      style={{ fontFamily: "Play, sans-serif" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-gray-700 relative"
      >
        <h1 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome Back!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-600 bg-gray-100 px-10 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none disabled:opacity-50"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-600 bg-gray-100 px-10 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none disabled:opacity-50"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none disabled:opacity-50"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.05 }}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-500 px-5 py-3 text-white font-bold tracking-wide shadow-md transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* Spinner Loader */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-60 rounded-2xl z-10">
            <SpinnerLoader size={40} color="text-blue-500" />
          </div>
        )}

        {/* Register Link */}
        <p className="mt-6 text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-blue-400 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
