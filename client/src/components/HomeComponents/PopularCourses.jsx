import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CourseCard from "./CourseCard";
import SkeletonCard from "../Common/SkeletonCard";

export default function PopularCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });

    const API_URL =
      import.meta.env.VITE_API_URL || "https://bhiworkshop-1.onrender.com";

    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/courses`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section
      className="text-center py-16 bg-white text-black mb-4"
      style={{ fontFamily: "Play, sans-serif" }}
    >
      <span className="text-sm text-red-400 font-semibold">
        LEARN AT YOUR OWN PACE
      </span>

      <h1 className="font-bold text-4xl sm:text-6xl lg:text-7xl mt-2">
        Popular Workshops
      </h1>

      <p className="mt-8 text-base sm:text-xl text-gray-600 max-w-4xl mx-auto">
        Bright Horizon Institute offers students a high-quality workshop
        programs taught by experienced instructors.
      </p>

      <div className="mt-10 px-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <SkeletonCard key={index} />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <CourseCard courses={courses} />
          </div>
        )}
      </div>
    </section>
  );
}
