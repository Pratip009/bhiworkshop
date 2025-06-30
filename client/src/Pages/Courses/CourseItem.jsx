// components/HomeComponents/CourseItem.jsx
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const CourseItem = ({ course }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-4 hover:shadow-xl transition duration-300">
      <img
        src={course.imgUrl}
        alt={course.title}
        className="w-full h-44 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
        {course.description}
      </p>
      <Link
        to={`/courses/${course._id}`}
        className="text-blue-600 text-sm font-semibold hover:underline"
      >
        View Details →
      </Link>
    </div>
  );
};

export default CourseItem;
