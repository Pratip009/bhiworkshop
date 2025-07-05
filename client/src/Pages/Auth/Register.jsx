import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaMobile,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (username.trim().length < 3) {
      alert("Username must be at least 3 characters.");
      return false;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return false;
    }
    if (!/^\d{10}$/.test(contact)) {
      alert("Contact number must be 10 digits.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(`${API_URL}/auth/register`, {
        email,
        username,
        password,
        contact,
        role: "user",
      });
      alert("User registered successfully");
      setEmail("");
      setUsername("");
      setPassword("");
      setContact("");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-gray-700"
      >
        <h1 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
          Create an Account
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
              className="w-full rounded-lg border border-gray-600 bg-gray-100 px-10 py-3 text-gray-900 placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-300 focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Username Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full rounded-lg border border-gray-600 bg-gray-100 px-10 py-3 text-gray-900 placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-300 focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Contact Number */}
          <div className="relative">
            <FaMobile className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Contact Number"
              required
              className="w-full rounded-lg border border-gray-600 bg-gray-100 px-10 py-3 text-gray-900 placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-300 focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Password Field with Toggle */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full rounded-lg border border-gray-600 bg-gray-100 px-10 py-3 text-gray-900 placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-300 focus:outline-none transition-all duration-300"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full rounded-lg bg-green-500 px-5 py-3 text-black font-bold tracking-wide shadow-md transition-all duration-300 hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Register
          </motion.button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-400 font-medium hover:underline"
          >
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
