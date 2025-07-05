import { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/slider/newlogo.png";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";

// Modern pastel color palette (no gradients)
const PRIMARY_BG = "#f7fafc"; // light pastel background
const ACCENT = "#FFFFFFFF"; // fresh teal accent
const SECONDARY = "#144AB0FF"; // soft blue

const Header = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [coursesData, setCoursesData] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClickOutside = (e) => {
    if (!e.target.closest(".user-menu")) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/courses`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCoursesData(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (!Array.isArray(coursesData) || searchQuery.trim() === "") {
      setFilteredCourses([]);
      return;
    }
    const filtered = coursesData.filter((course) =>
      course.title?.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchQuery, coursesData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredCourses([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCourseClick = (courseId) => {
    setSearchQuery("");
    setFilteredCourses([]);
    navigate(`/courses/${courseId}`);
  };
  return (
    <header
      className="sticky top-0 left-0 w-full z-50 shadow-md border-b font-play"
      style={{
        background: PRIMARY_BG,
        borderColor: ACCENT,
        fontFamily: 'Play',
       
      }}
    >
      <div className="px-6 mx-auto max-w-8xl sm:px-8 lg:px-12 flex items-center justify-between h-20">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-14" />
        </Link>

        {/* Search Bar */}
        <div
          className="hidden lg:flex flex-grow justify-center relative"
          ref={searchRef}
        >
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Workshops"
              className="font-play w-full px-5 py-2 text-black bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#70c1b3] placeholder-gray-400 shadow"
              style={{
                transition: "box-shadow 0.2s",
                fontSize: "1rem",
                background: "#fff",
              }}
            />
            <button className="absolute inset-y-0 right-3 flex items-center">
              <FaSearch className="h-5 w-5 text-gray-400 hover:text-[#70c1b3] transition" />
            </button>
          </div>

          {/* Search Dropdown */}
          {filteredCourses.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-2 z-[999] max-h-60 overflow-y-auto shadow-lg">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-[#e2f6f5] transition"
                  onClick={() => handleCourseClick(course._id)}
                >
                  <img
                    src={course.imgUrl}
                    alt={course.title}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  />
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-black">
                      {course.title}
                    </span>
                    <span className="text-sm text-gray-400 mt-0.5">
                      {course.totalHours} • {course.duration}
                    </span>
                    <span className="text-sm text-gray-500">
                      🎓 {course.certification} &nbsp;|&nbsp; 🏅{" "}
                      {course.credential}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nav Links */}
        <div
          className="hidden lg:flex gap-x-1"
          style={{
            fontFamily: "Kanit, sans-serif",
            fontWeight: "700",
            alignItems: "center",
          }}
        >
          {[
            { path: "/", label: "Home" },
            { path: "/workshops", label: "Workshops" },
            { path: "/contact", label: "Contact" },
          ].map(({ path, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="px-3 py-2 rounded-lg transition-all font-play"
                style={{
                  color: isActive ? ACCENT : "#2d3748",
                  background: isActive ? SECONDARY : "transparent",
                  fontWeight: isActive ? "bold" : "normal",
                  textDecoration: "none",
                  fontFamily: 'Play',
                
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {label}
              </Link>
            );
          })}
          {/* Auth */}
          <div className="ml-6 flex items-center justify-center relative">
            {user ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
                className="user-menu flex items-center gap-2 px-4 py-2 rounded-full shadow border border-gray-200 bg-white hover:bg-[#e2f6f5] transition"
                style={{
                  color: "#293241",
                  fontWeight: "bold",
                  fontFamily: 'Play',
                
                  letterSpacing: "0.03em",
                  cursor: "pointer",
                }}
              >
                <FaUserCircle className="h-6 w-6 text-[#70c1b3]" />
                <span>
                  Hi, <span className="font-bold">{user.username}</span>
                </span>
              </button>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 rounded-full font-semibold transition border border-[#70c1b3] bg-white hover:bg-[#e2f6f5] text-[#293241] shadow"
                style={{
                  fontWeight: "bold",
                  fontFamily: 'Play',
                  
                  letterSpacing: "0.03em",
                  border: "1.5px solid #70c1b3",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                Sign In / Sign Up
              </Link>
            )}
            {user && dropdownOpen && (
              <div className="absolute top-full mt-2 right-0 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                <ul className="p-0 text-gray-700 text-sm">
                  <li>
                    <Link
                      to={
                        user?.role?.toLowerCase() === "admin"
                          ? "/admin"
                          : "/profile"
                      }
                      className={`block px-4 py-2 hover:bg-[#e2f6f5] transition rounded-md ${
                        user?.role?.toLowerCase() === "admin"
                          ? "text-green-600 font-bold"
                          : "text-blue-600"
                      }`}
                    >
                      {user?.role?.toLowerCase() === "admin"
                        ? "Admin Dashboard"
                        : "My Profile"}
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-[#ffe066] rounded-md"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-[#70c1b3] focus:outline-none"
        >
          {isMenuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav
          className="absolute top-20 left-0 w-full shadow-md border-t lg:hidden"
          style={{
            background: "#fff",
            borderColor: ACCENT,
          }}
        >
          <div className="flex flex-col px-6 py-4 space-y-3">
            {[
              { path: "/", label: "Home" },
              { path: "/workshops", label: "Workshops" },
              { path: "/contact", label: "Contact" },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-[#70c1b3] hover:text-[#ff6f91] transition px-4 py-2 rounded-lg font-semibold"
              >
                {label}
              </Link>
            ))}
            {user ? (
              <div className="mt-2 px-2">
                <Link
                  to={user?.role === "admin" ? "/admin" : "/profile"}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block font-semibold py-2 ${
                    user?.role === "admin" ? "text-green-600" : "text-blue-600"
                  }`}
                >
                  {user?.role === "admin" ? "Admin Dashboard" : "My Profile"}
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left text-red-500 font-medium py-2"
                  style={{
                    background: SECONDARY,
                    borderRadius: "9999px",
                    marginTop: "0.5rem",
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-2 mt-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center rounded-full font-semibold shadow-md transition border border-[#70c1b3] bg-white hover:bg-[#e2f6f5] text-[#293241]"
                  style={{
                    fontWeight: "bold",
                    fontFamily: 'Play',
                  
                    letterSpacing: "0.03em",
                    border: "1.5px solid #70c1b3",
                    padding: "0.75rem 0",
                    textDecoration: "none !important",
                  }}
                >
                  Sign In / Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
