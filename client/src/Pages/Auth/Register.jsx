import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; // ✅ eye icons
import register from "../../assets/images/register.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ toggle state
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const navigate = useNavigate(); // ✅ initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/register`, {
        email,
        username,
        password,
        contact,
        role: "user",
      });

      alert("User registered successfully ✅");

      // ✅ redirect to login page
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed ❌. Try again.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side with animated background */}
      <div className="hidden md:flex flex-1 flex-col justify-center text-white p-12 animate-gradient bg-gradient-to-r from-yellow-500 via-white to-orange-500 bg-[length:200%_200%]">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-black">
            Discover Your Next Skill with BHIWorkshop
          </h1>
          <p className="text-lg text-gray-800 mb-8">
            We provide hands-on workshops in creative, technical, and lifestyle
            fields — from Sewing & Makeup to Mobile Repair & Calligraphy
          </p>
          <div className="flex justify-center">
            <img
              src={register}
              alt="Workshops"
              className="w-60 h-60 drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-full max-w-md px-8">
          <h2 className="text-2xl font-semibold mb-6">Create an account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-black"
              />
            </div>

            {/* Password with eye toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:border-black focus:ring-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use at least 8 characters.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-md bg-black text-white font-semibold hover:bg-gray-800 transition"
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-black font-medium hover:underline">
              Log in →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
