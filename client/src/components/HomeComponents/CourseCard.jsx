/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaClock, FaRegArrowAltCircleRight } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import AuthContext from "../../context/AuthContext";
import "./CourseCard.css";

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

  return (
    <div className="courses-container">
      {courses.map((course) => (
        <div key={course._id} className="card">
          {/* Image section */}
          <div className="img">
            <img src={course.imgUrl} alt={course.title} />
          </div>

          {/* Course title */}
          <span className="course-title">{course.title}</span>

          {/* Course details */}
          <div className="course-details">
            <p className="info">
              <FaClock className="mr-1 text-red-500" />
              {course.totalHours}
            </p>
            <p className="info">
              <SlCalender className="mr-1 text-red-500" />
              {course.duration}
            </p>
          </div>

          {/* Additional course info */}
          <div className="additional-info">
            <p className="info">
              <b>Certification:</b> {course.certification}
            </p>
            <p className="info">
              <b>Credential:</b> {course.credential}
            </p>
            <p className="info">
              <b>Job:</b> {course.certification}
            </p>
          </div>

          {/* Button */}
          <button
            className="view-button"
            onClick={() => handleViewProgramClick(course._id)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            View Programs <FaRegArrowAltCircleRight className="ml-3" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
