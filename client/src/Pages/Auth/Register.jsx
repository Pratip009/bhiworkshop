import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/register`, {
        email,
        username,
        password,
        role: "user",
      });
      alert("User registered successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
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
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-10 py-3 text-gray-800 shadow-sm outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
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
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-10 py-3 text-gray-800 shadow-sm outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-10 py-3 text-gray-800 shadow-sm outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full rounded-lg bg-green-600 px-5 py-3 text-white font-bold tracking-wide shadow-md transition-all duration-300 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400"
          >
            Register
          </motion.button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
