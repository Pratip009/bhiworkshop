import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaEdit } from "react-icons/fa";

const AddCourse = () => {
  const API_URL = "http://localhost:8000";

  const defaultCourse = {
    title: "",
    imgUrl: "",
    price: "",
    duration: "",
    totalHours: "",
    calendarLength: "",
    classDays: "",
    description: "",
    certification: "",
    kitsIncluded: false,
    startDate: "",
    endDate: "",
    availableSeats: "",
  };

  const [course, setCourse] = useState(defaultCourse);
  const [learningOutcomes, setLearningOutcomes] = useState([]);
  const [learningInput, setLearningInput] = useState("");
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      alert("Error fetching courses: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      ...course,
      price: Number(course.price),
      availableSeats: Number(course.availableSeats),
      learningOutcomes,
    };

    try {
      const response = await fetch(
        `${API_URL}/courses${isEditing ? `/${editingCourseId}` : ""}`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to save course");

      alert(isEditing ? "Course updated" : "Course added");
      setCourse(defaultCourse);
      setLearningOutcomes([]);
      setLearningInput("");
      setIsEditing(false);
      setEditingCourseId(null);
      fetchCourses();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (courseData) => {
    setCourse(courseData);
    setLearningOutcomes(courseData.learningOutcomes || []);
    setIsEditing(true);
    setEditingCourseId(courseData._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/courses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete");

      alert("Deleted successfully");
      fetchCourses();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? "Edit" : "Add"} Course
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            name="title"
            value={course.title}
            onChange={handleChange}
            required
            placeholder="Title"
            className="border p-2 rounded-md w-full"
          />
          <input
            name="imgUrl"
            value={course.imgUrl}
            onChange={handleChange}
            required
            placeholder="Image URL"
            className="border p-2 rounded-md w-full"
          />
          <input
            name="price"
            type="number"
            value={course.price}
            onChange={handleChange}
            required
            placeholder="Price"
            className="border p-2 rounded-md w-full"
          />
          <input
            name="duration"
            value={course.duration}
            onChange={handleChange}
            required
            placeholder="Duration"
            className="border p-2 rounded-md w-full"
          />
          <input
            name="totalHours"
            value={course.totalHours}
            onChange={handleChange}
            required
            placeholder="Total Hours"
            className="border p-2 rounded-md w-full"
          />
          <input
            name="calendarLength"
            value={course.calendarLength}
            onChange={handleChange}
            required
            placeholder="Calendar Length"
            className="border p-2 rounded-md w-full"
          />
          <input
            name="classDays"
            value={course.classDays}
            onChange={handleChange}
            required
            placeholder="Class Days"
            className="border p-2 rounded-md w-full"
          />
          <input
            name="certification"
            value={course.certification}
            onChange={handleChange}
            required
            placeholder="Certification"
            className="border p-2 rounded-md w-full"
          />
          <input
            name="startDate"
            value={course.startDate}
            onChange={handleChange}
            required
            placeholder="Start Date (e.g., 2025-06-29)"
            className="border p-2 rounded-md w-full"
          />
          <input
            name="endDate"
            value={course.endDate}
            onChange={handleChange}
            required
            placeholder="End Date (e.g., 2025-08-30)"
            className="border p-2 rounded-md w-full"
          />
          <input
            name="availableSeats"
            type="number"
            value={course.availableSeats}
            onChange={handleChange}
            required
            placeholder="Available Seats"
            className="border p-2 rounded-md w-full"
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="kitsIncluded"
              checked={course.kitsIncluded}
              onChange={handleChange}
            />
            <span className="ml-2">Kits Included</span>
          </label>
          <div className="col-span-2">
            <ReactQuill
              value={course.description}
              onChange={(value) => setCourse({ ...course, description: value })}
              placeholder="Description"
              className="bg-white"
            />
          </div>

          {/* Learning Outcomes */}
          <div className="col-span-2">
            <input
              value={learningInput}
              onChange={(e) => setLearningInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && learningInput.trim()) {
                  e.preventDefault();
                  setLearningOutcomes([
                    ...learningOutcomes,
                    learningInput.trim(),
                  ]);
                  setLearningInput("");
                }
              }}
              placeholder="Add learning outcome and press Enter"
              className="w-full border p-2 rounded-md"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {learningOutcomes.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 px-2 py-1 rounded-full text-sm flex items-center"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() =>
                      setLearningOutcomes(
                        learningOutcomes.filter((_, i) => i !== idx)
                      )
                    }
                    className="ml-2 text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

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
        <h2 className="text-xl font-bold mb-4">Courses List</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Start Date</th>
              <th className="border p-2">End Date</th>
              <th className="border p-2">Seats</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c._id} className="hover:bg-gray-100">
                <td className="border p-2">{c.title}</td>
                <td className="border p-2">₹{c.price}</td>
                <td className="border p-2">{c.startDate}</td>
                <td className="border p-2">{c.endDate}</td>
                <td className="border p-2">{c.availableSeats}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(c)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
  );
};

export default AddCourse;
