import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useAuth from "../../context/useAuth";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import SpinnerLoader from "../../components/Loader";
import loginImg from "../../assets/images/loginn.png"; // ✅ reuse same image

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

      login(token);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err.message || err);
      alert("Login failed. Check your email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side with animated background */}
      <div className="hidden md:flex flex-1 flex-col justify-center text-white p-12 animate-gradient bg-gradient-to-r from-green-500 via-white to-green-900 bg-[length:200%_200%]">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-black">
            Welcome Back to BHIWorkshop
          </h1>
          <p className="text-lg text-gray-800 mb-8">
            Continue learning, creating, and exploring new skills with our
            workshops.
          </p>
          <div className="flex justify-center">
            <img
              src={loginImg}
              alt="Workshops"
              className="w-60 h-60 drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Right side login form */}
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-full max-w-md px-8 relative">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

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
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-10 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-black disabled:opacity-50"
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
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-10 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-black disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none disabled:opacity-50"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-md bg-black text-white font-semibold hover:bg-gray-800 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Spinner Loader */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 rounded-2xl z-10">
              <SpinnerLoader size={40} color="text-black" />
            </div>
          )}

          {/* Register Link */}
          <p className="mt-6 text-sm text-gray-600 text-center">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-black font-medium hover:underline"
            >
              Sign up →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
