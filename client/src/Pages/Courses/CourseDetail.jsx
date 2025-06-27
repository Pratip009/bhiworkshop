import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Banner from "../../components/Banner";
import SpinnerLoader from "../../components/Loader";

import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaClock,
  FaCertificate,
  FaGraduationCap,
  FaListAlt,
} from "react-icons/fa";

const CourseDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    AOS.init();

    // Check auth status from localStorage
    const token = localStorage.getItem("token");
    setIsSignedIn(!!token);

    // Fetch courses
    fetch(`${API_URL}/courses`)
      .then((response) => response.json())
      .then((data) => {
        const selectedCourse = data.find((course) => course._id === id);
        setCourse(selectedCourse);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
        setCourse(null);
      });
  }, [id]);

  const handleEnroll = () => {
    if (isSignedIn) {
      navigate(`/payment/${id}`, { state: { course } });
    } else {
      navigate("/login");
    }
  };

  if (course === null) {
    return (
      <div className="flex items-center justify-center text-center py-12">
        <SpinnerLoader size={48} />
      </div>
    );
  }

  const {
    title,
    imgUrl,
    price,
    duration,
    totalHours,
    credential,
    preRequisite,
    description,
    content,
    certification,
  } = course;

  const courseContents = content || [];

  return (
    <div className="container mx-auto mt-16 font-nunito">
      <Banner
        text={title}
        imageUrl="https://static.vecteezy.com/system/resources/thumbnails/046/946/744/small_2x/school-students-in-modern-computer-based-classroom-in-school-education-of-programming-languages-video.jpg"
      />

      <div className="flex flex-col lg:flex-row mt-8 px-4 md:px-12">
        {/* Left: Details */}
        <div className="lg:w-2/3 w-full lg:pr-12 mb-6 lg:mb-0">
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-auto rounded-2xl shadow-2xl border-4 border-gray-200 hover:border-green-400 transition-all duration-300"
            data-aos="fade-up"
          />

          {/* Tabs */}
          <div className="flex justify-center space-x-6 border-b border-gray-300 mb-6 mt-4">
            {["description", "contents", "duration"].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 text-lg font-semibold ${
                  activeTab === tab
                    ? "border-b-4 border-green-400 text-green-400"
                    : "text-gray-600 hover:text-green-400"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "description" && (
              <p className="text-base text-black sm:text-xl">{description}</p>
            )}
            {activeTab === "contents" && (
              <ul className="list-disc pl-6 space-y-2 text-base text-black sm:text-xl">
                {courseContents.length > 0 ? (
                  courseContents.map((content, index) => (
                    <li key={index} className="text-lg">
                      {content}
                    </li>
                  ))
                ) : (
                  <li className="text-lg">No course contents available</li>
                )}
              </ul>
            )}
            {activeTab === "duration" && (
              <div>
                <p className="text-base text-black sm:text-xl">
                  <strong>Pre-requisite:</strong>{" "}
                  {preRequisite || "Not specified"}
                </p>
                <p className="text-base text-black sm:text-xl">
                  <strong>Total Clock Hours:</strong>{" "}
                  {totalHours || "Not specified"} Hours
                </p>
                <p className="text-base text-black sm:text-xl">
                  <strong>Certification:</strong>{" "}
                  {certification || "Not specified"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div
          className="lg:w-1/3 w-full bg-white p-6 rounded-lg shadow-lg lg:mt-0 mt-6"
          style={{ maxHeight: "fit-content" }}
          data-aos="fade-left"
        >
          <h2
            className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl"
            data-aos="fade-up"
          >
            {title}
          </h2>
          <p className="text-2xl text-gray-700 mb-4">
            <span className="text-green-400 text-3xl font-bold">${price}</span>
          </p>

          <div className="text-md text-gray-700 mb-6">
            <p className="flex items-center">
              <FaClock className="mr-2 text-red-600" />
              <span className="font-semibold">
                <b>Duration:</b> {duration || "Not specified"}
              </span>
            </p>
            <p className="flex items-center">
              <FaListAlt className="mr-2 text-red-600" />
              <span className="font-semibold">
                <b>Time:</b> {totalHours || "Not specified"} Hours
              </span>
            </p>
            <p className="flex items-center">
              <FaGraduationCap className="mr-2 text-red-600" />
              <span className="font-semibold">
                <b>Credential:</b> {credential || "Not specified"}
              </span>
            </p>
            <p className="flex items-center">
              <FaCertificate className="mr-2 text-red-600" />
              <span className="font-semibold">
                <b>Pre-Requisite:</b> {preRequisite || "Not specified"}
              </span>
            </p>
          </div>

          {/* Enroll / Sign In Button */}
          <button
            className={`w-full py-3 px-4 ${
              isSignedIn ? "bg-green-400 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700"
            } text-white text-2xl font-semibold rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            data-aos="zoom-in"
            onClick={handleEnroll}
          >
            {isSignedIn ? "Enroll Now" : "Sign in to Enroll"}
          </button>

          {/* Video */}
          <div className="mt-6 mb-4" data-aos="fade-up">
            <iframe
              className="w-full h-64 rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/-sfMwZ3dJPw"
              title="Course Introduction"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
