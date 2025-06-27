import { useState, useEffect } from "react";
// Removed: import axios from "axios";  <--  Not needed for the browser
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { FaEdit } from "react-icons/fa";

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    imgUrl: "",
    price: "",
    duration: "",
    totalHours: "",
    credential: "",
    preRequisite: "",
    description: "",
    content: "",
    certification: "",
  });

  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);

  //  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";  <--  import.meta is not standard browser JS
  const API_URL = "http://localhost:8000"; //  Hardcoded, or you can configure this differently.  See notes.

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      //  const { data } = await axios.get(`${API_URL}/courses`);  <--  axios not available
      const response = await fetch(`${API_URL}/courses`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      alert("Failed to fetch courses!  Check your server connection."); // Provide user feedback
    }
  };

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); //  This is OK in browser

    try {
      let response;
      if (isEditing) {
        // Update the course
        response = await fetch(`${API_URL}/courses/${editingCourseId}`, {
          method: "PUT", //  Correct method for update
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //  Include the token
          },
          body: JSON.stringify(course), //  Serialize the data
        });
        if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert("Course updated successfully");
      } else {
        // Add a new course
        response = await fetch(`${API_URL}/courses`, {
          method: "POST",  //  Correct method for create
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //  Include the token
          },
          body: JSON.stringify(course), //  Serialize the data
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert("Course added successfully");
      }


      // Clear the form fields by resetting the course state
      setCourse({
        title: "",
        imgUrl: "",
        price: "",
        duration: "",
        totalHours: "",
        credential: "",
        preRequisite: "",
        description: "",
        content: "",
        certification: "",
      });

      // Reset the editing state
      setIsEditing(false);
      setEditingCourseId(null);

      // Refresh the course list
      fetchCourses();
    } catch (error) {
      //  alert(error.response?.data?.message || "Failed to save course");  <--  No axios, so adjust
      alert(error.message || "Failed to save course");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/courses/${id}`, {
        method: "DELETE", //  Correct method for delete
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Course deleted successfully");
      fetchCourses();
    } catch (error) {
       alert(error.message || "Failed to delete course");
    }
  };

  const handleEdit = (selectedCourse) => {
    setCourse({
      title: selectedCourse.title || "",
      imgUrl: selectedCourse.imgUrl || "",
      price: selectedCourse.price?.toString() || "",
      duration: selectedCourse.duration || "",
      totalHours: selectedCourse.totalHours || "",
      credential: selectedCourse.credential || "",
      preRequisite: selectedCourse.preRequisite || "",
      description: selectedCourse.description || "",
      content: Array.isArray(selectedCourse.content)
        ? selectedCourse.content.join("")
        : selectedCourse.content || "",
      certification: selectedCourse.certification || "",
    });

    setIsEditing(true);
    setEditingCourseId(selectedCourse._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditing ? "Edit Course" : "Add Course"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              className="border p-2 rounded-md w-full"
              type="text"
              name="title"
              value={course.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              className="border p-2 rounded-md w-full"
              type="text"
              name="imgUrl"
              value={course.imgUrl}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              className="border p-2 rounded-md w-full"
              type="number"
              name="price"
              value={course.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              className="border p-2 rounded-md w-full"
              type="text"
              name="duration"
              value={course.duration}
              onChange={handleChange}
              required
            />
          </div>

          {/* Total Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Hours
            </label>
            <input
              className="border p-2 rounded-md w-full"
              type="text"
              name="totalHours"
              value={course.totalHours}
              onChange={handleChange}
              required
            />
          </div>

          {/* Credential */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Credential
            </label>
            <input
              className="border p-2 rounded-md w-full"
              type="text"
              name="credential"
              value={course.credential}
              onChange={handleChange}
              required
            />
          </div>

          {/* Pre-Requisite */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pre-Requisite
            </label>
            <input
              className="border p-2 rounded-md w-full"
              type="text"
              name="preRequisite"
              value={course.preRequisite}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <ReactQuill
              className="bg-white"
              theme="snow"
              value={course.description}
              onChange={(value) =>
                handleChange({ target: { name: "description", value } })
              }
              placeholder="Enter rich formatted description"
            />
          </div>

          {/* Content */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <ReactQuill
              className="bg-white"
              theme="snow"
              value={course.content}
              onChange={(value) =>
                handleChange({ target: { name: "content", value } })
              }
              placeholder="Enter course content"
            />
          </div>

          {/* Certification */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Certification
            </label>
            <input
              className="border p-2 rounded-md w-full"
              type="text"
              name="certification"
              value={course.certification}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600"
            >
              {isEditing ? "Update Course" : "Add Course"}
            </button>
          </div>
        </form>
      </div>

      {/* Course List */}
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Courses List</h2>
        <div className="overflow-auto max-h-96">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-2">Title</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Duration</th>
                <th className="border p-2">Credential</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c._id} className="hover:bg-gray-100">
                  <td className="border p-2">{c.title}</td>
                  <td className="border p-2">${c.price}</td>
                  <td className="border p-2">{c.duration}</td>
                  <td className="border p-2">{c.credential}</td>
                  <td className="border p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
