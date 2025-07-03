// CourseDetail.jsx
/* eslint-disable react/prop-types */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import SpinnerLoader from "../../components/Loader";
import AuthContext from "../../context/AuthContext";
import {
  FaClock,
  FaHourglassHalf,
  FaCalendarAlt,
  FaCalendarCheck,
  FaAward,
  FaBox,
  FaCheckCircle,
} from "react-icons/fa";

const splitLearningOutcomes = (arr) => {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    import.meta.env.VITE_API_URL || "https://bhiworkshop-1.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const courseRes = await fetch(`${API_URL}/courses`);
        const courses = await courseRes.json();
        const found = courses.find((c) => c._id === id);
        if (!found) {
          navigate("/404");
          return;
        }
        setCourse(found);

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (user && token && userId) {
          const userRes = await fetch(`${API_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = await userRes.json();
          if (userData.purchasedCourses) {
            setUserCourses(
              userData.purchasedCourses.map((c) => c.course._id || c.course)
            );
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate, user, API_URL]);

  const handleEnroll = () => {
    if (user) {
      navigate(`/payment-options`, { state: { course } });
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <SpinnerLoader size={70} />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white text-red-500 text-xl font-semibold">
        <p>{error || "Course not found."}</p>
      </div>
    );
  }

  const {
    title,
    imgUrl,
    price,
    duration,
    totalHours,
    calendarLength,
    classDays,
    description,
    certification,
    learningOutcomes = [],
    kitsIncluded,
    startDate,
    endDate,
    availableSeats,
  } = course;

  const isEnrolled = user && userCourses.includes(course._id);
  const allOutcomes = [
    ...splitLearningOutcomes(learningOutcomes)[0],
    ...splitLearningOutcomes(learningOutcomes)[1],
  ];

  return (
    <div
      className="min-h-screen bg-white text-black"
      style={{ fontFamily: "Play, sans-serif" }}
    >
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* LEFT PANEL */}
          <div>
            <img
              src={imgUrl}
              alt={title}
              className="w-full h-[340px] rounded-xl object-cover border border-gray-200 shadow-sm"
            />
            <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
              <DetailItem icon={<FaClock />} label={duration} />
              <DetailItem
                icon={<FaHourglassHalf />}
                label={`${totalHours} Hours`}
              />
              <DetailItem icon={<FaCalendarAlt />} label={calendarLength} />
              <DetailItem icon={<FaCalendarCheck />} label={classDays} />
              <DetailItem icon={<FaAward />} label={certification} />
              {kitsIncluded && (
                <DetailItem icon={<FaBox />} label="Kits Included" />
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6">
              {description}
            </p>

            {/* Price & Enroll Button */}
            <div className="flex items-center flex-wrap gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${price}
                  </span>
                  <span className="line-through text-gray-500 text-lg">
                    ${(price * 1.2).toFixed(0)}
                  </span>
                </div>
                <p className="text-xs text-green-600 font-semibold mt-1">
                  20% off this week!
                </p>
              </div>

              {!isEnrolled ? (
                <button
                  onClick={handleEnroll}
                  className="bg-[#57B4BA] hover:bg-[#45a3a0] text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  {user ? "Enroll Now" : "Sign in to Enroll"}
                </button>
              ) : (
                <span className="bg-green-600 text-white font-semibold py-2 px-5 rounded-md shadow">
                  Enrolled! We&apos;ll contact you soon.
                </span>
              )}
            </div>

            {/* Date & Seat Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center bg-indigo-50 border border-indigo-300 rounded-lg p-4 mb-10">
              <InfoBox label="Start Date" value={startDate || "N/A"} />
              <InfoBox label="End Date" value={endDate || "N/A"} />
              <InfoBox label="Seats Available" value={availableSeats ?? "0"} />
            </div>
          </div>
        </div>

        {/* What You’ll Learn Section */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What you&apos;ll learn
          </h2>
          <ul className="space-y-3 bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
            {allOutcomes.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-800">
                <FaCheckCircle className="mt-1 text-[#57B4BA]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Sticky Bar for Mobile */}
      {!isEnrolled && (
        <div className="md:hidden fixed bottom-0 w-full left-0 bg-gray-100 border-t border-gray-300 shadow-lg z-30 flex justify-between items-center px-4 py-3">
          <div>
            <span className="font-bold text-gray-800 text-lg">${price}</span>
            <span className="text-xs text-green-500 ml-2 font-semibold">
              20% off
            </span>
          </div>
          <button
            onClick={handleEnroll}
            className="bg-[#57B4BA] hover:bg-[#45a3a0] text-white font-bold py-2 px-5 rounded-lg text-sm transition"
          >
            {user ? "Enroll" : "Sign in"}
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-8 px-4 mt-14 bg-gray-100 text-gray-600 text-center border-t">
        <span className="font-semibold">
          © {new Date().getFullYear()} Your Academy. All rights reserved.
        </span>
      </footer>
    </div>
  );
};

// Helper Component for icon-label pairs
const DetailItem = ({ icon, label }) => (
  <div className="flex items-center gap-2 text-sm">
    <span className="text-[#57B4BA]">{icon}</span>
    <span>{label}</span>
  </div>
);

// Box for Start Date / End Date / Seats
const InfoBox = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-lg font-semibold text-[#57B4BA]">{value}</p>
  </div>
);

export default CourseDetail;
