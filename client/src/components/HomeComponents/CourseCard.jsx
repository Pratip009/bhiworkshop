/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaClock } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import AuthContext from "../../context/AuthContext";

// Modern, vibrant palette and card style
const CARD_BG = "linear-gradient(135deg, #f9f9ff 0%, #e0f7fa 100%)";
const ACCENT = "#3EC6E0";
const ACCENT_DARK = "#249eb5";
const BADGE_BG = "linear-gradient(90deg, #ffb09e 0%, #ffd6e0 100%)";
const TITLE_COLOR = "#232c47";
const DESC_COLOR = "#4b5563";
const SEAT_COLOR = "#000000FF";

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

  const truncateText = (htmlString, wordLimit = 13) => {
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
          className="w-full rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-0 flex flex-col relative overflow-hidden"
          style={{
            fontFamily: "Play, sans-serif",
            background: CARD_BG,
            color: TITLE_COLOR,
            minHeight: 430,
            border: "1.5px solid #e0f2f1",
          }}
        >
          {/* Image */}
          <div className="relative group">
            <img
              src={course.imgUrl}
              alt={course.title}
              className="w-full h-48 object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
              style={{
                boxShadow: "0 6px 18px 0 rgba(62, 198, 224, 0.12)",
                borderBottom: "4px solid #3EC6E0",
              }}
            />
            <span
              className="absolute top-4 right-4 text-xs px-4 py-1 rounded-full shadow-md font-semibold tracking-wide"
              style={{
                background: BADGE_BG,
                color: SEAT_COLOR,
                letterSpacing: "0.03em",
                fontSize: "1rem",
                boxShadow: "0 2px 8px 0 rgba(255,176,158,0.13)",
              }}
            >
              {course.availableSeats ?? "0"} Seats
            </span>
          </div>

          {/* Content */}
          <div className="px-6 pt-4 pb-6 flex flex-col flex-grow">
            <h3
              className="text-xl font-extrabold text-center mb-2 leading-tight break-words"
              style={{
                color: TITLE_COLOR,
                letterSpacing: "0.01em",
                textShadow: "0 2px 12px #cfd8dc33",
              }}
            >
              {course.title || "Untitled"}
            </h3>

            <div className="flex justify-center text-sm gap-7 mb-2">
              <div className="flex items-center gap-2">
                <FaClock className="text-[#3EC6E0] opacity-70" />
                <span className="font-medium">{course.totalHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <SlCalender className="text-[#3EC6E0] opacity-70" />
                <span className="font-medium">{course.duration}</span>
              </div>
            </div>

            <p
              className="text-base mb-3 text-center font-medium"
              style={{
                color: DESC_COLOR,
                minHeight: 48,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {truncateText(course.description, 16)}
            </p>

            <div className="flex justify-between text-xs mb-5 px-1">
              <span>
                <strong style={{ color: ACCENT }}>Start:</strong>{" "}
                <span style={{ color: TITLE_COLOR }}>
                  {course.startDate || "N/A"}
                </span>
              </span>
              <span>
                <strong style={{ color: ACCENT }}>End:</strong>{" "}
                <span style={{ color: TITLE_COLOR }}>
                  {course.endDate || "N/A"}
                </span>
              </span>
            </div>

            <button
              onClick={() => handleViewProgramClick(course._id)}
              className="mt-auto w-full text-white text-base py-2 rounded-full font-bold shadow-lg transition-all"
              style={{
                background: ACCENT,
                boxShadow: "0 4px 16px 0 rgba(62,198,224,0.20)",
                letterSpacing: "0.045em",
                outline: "none",
                border: "none",
                fontFamily: "Kanit, sans-serif",
              }}
              onMouseOver={e =>
                (e.currentTarget.style.background = ACCENT_DARK)
              }
              onMouseOut={e =>
                (e.currentTarget.style.background = ACCENT)
              }
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