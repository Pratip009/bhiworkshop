import { useState, useEffect } from "react";
import CourseCard from "../../components/HomeComponents/CourseCard";
import Banner from "../../components/Banner";
import SpinnerLoader from "../../components/Loader";
import courseImg from "../../assets/images/illu.jpg";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_URL =
    import.meta.env.VITE_API_URL || "https://bhiworkshop-1.onrender.com";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/courses`);
        if (!response.ok) {
          throw new Error("Failed to fetch courses.");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <SpinnerLoader size={35} />
      </div>
    );

  if (error)
    return (
      <div className="text-center py-8 text-red-400 bg-[#0f172a] min-h-screen">
        Error: {error}
      </div>
    );

  return (
    <div className="relative container-fluid overflow-hidden bg-white text-black min-h-screen">
      {/* SVG Background Elements */}
      <div className="absolute inset-0 -z-10">
        <svg
          className="absolute top-[-50px] left-[-50px] w-64 h-64 opacity-10"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          fill="#60A5FA"
        >
          <circle cx="200" cy="200" r="150" />
        </svg>

        <svg
          className="absolute bottom-[-80px] right-[-60px] w-80 h-80 opacity-10"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          fill="#FB7185"
        >
          <rect x="50" y="50" width="300" height="300" rx="50" />
        </svg>

        <svg
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-40 h-40 opacity-10"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          fill="#F9A8D4"
        >
          <circle cx="200" cy="200" r="120" />
        </svg>

        <svg
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-5"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          fill="#A855F7"
        >
          <path d="M56.2,-60.1C72.3,-52.3,83.6,-31.5,80.7,-13.7C77.8,4.1,60.8,19.1,46.3,31.2C31.9,43.4,19.9,52.7,4.2,54.6C-11.6,56.6,-23.1,51.1,-34,42.2C-44.9,33.2,-55.3,21,-58.3,6.5C-61.2,-8,-56.8,-24.9,-47.1,-37.2C-37.4,-49.6,-22.4,-57.3,-4.6,-60.7C13.2,-64.2,26.3,-63.3,56.2,-60.1Z" />
        </svg>

        <svg
          className="absolute top-[20%] right-[10%] w-12 h-12 opacity-20"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="#FACC15"
        >
          <polygon points="50,15 90,85 10,85" />
        </svg>

        <svg
          className="absolute bottom-[10%] left-[10%] w-16 h-16 opacity-20"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="#38BDF8"
        >
          <polygon points="50,15 90,85 10,85" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="mt-12">
          <Banner text="Workshops" imageUrl={courseImg} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-3 mb-3">
          <CourseCard courses={courses} />
        </div>
      </div>
    </div>
  );
};

export default Courses;
