/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaClock } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import AuthContext from "../../context/AuthContext";

const CourseCard = ({ courses }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleViewProgramClick = (courseId) => {
    if (user) {
      navigate(`/courses/${courseId}`);
    } else {
      navigate("/login");
    }
  };

  const truncateText = (htmlString, wordLimit = 10) => {
    const plainText = htmlString.replace(/<[^>]+>/g, "");
    const words = plainText.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : plainText;
  };

  return (
    <>
      {courses.map((course) => (
        <div
          key={course._id}
          className="bg-white w-full rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200 flex flex-col relative"
          style={{ fontFamily: "Play, sans-serif" }}
        >
          {/* Image */}
          <div className="relative">
            <img
              src={course.imgUrl}
              alt={course.title}
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <span className="absolute top-2 right-2 bg-[#57B4BA] text-white text-xs px-3 py-1 rounded-full shadow-md">
              {course.availableSeats ?? "0"} Seats
            </span>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-base font-semibold text-center text-gray-900 mb-2 leading-tight break-words">
              {course.title || "Untitled"}
            </h3>

            <div className="flex justify-center text-xs text-gray-600 gap-4 mb-2">
              <div className="flex items-center gap-1">
                <FaClock className="text-[#57B4BA]" />
                <span>{course.totalHours}</span>
              </div>
              <div className="flex items-center gap-1">
                <SlCalender className="text-[#57B4BA]" />
                <span>{course.duration}</span>
              </div>
            </div>

            <p className="text-xs text-gray-700 mb-3 text-center">
              {truncateText(course.description, 12)}
            </p>

            <div className="flex justify-between text-xs text-gray-600 mb-4 px-1">
              <span>
                <strong>Start:</strong> {course.startDate || "N/A"}
              </span>
              <span>
                <strong>End:</strong> {course.endDate || "N/A"}
              </span>
            </div>

            <button
              onClick={() => handleViewProgramClick(course._id)}
              className="mt-auto w-full bg-[#57B4BA] hover:bg-[#45a3a0] text-white text-sm py-2 rounded-md"
            >
              View Program
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CourseCard;
