// components/Admin/AddWorkshop.jsx
import { useState } from "react";
import axios from "axios";

const AddWorkshop = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL; // ✅ From .env

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("⚠️ Please upload an image");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("image", image); // ✅ Backend key

      const token = localStorage.getItem("token"); // If you need auth

      const { data } = await axios.post(
        `${API_URL}/api/workshops`, // ✅ Full backend URL
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      setMessage(`✅ Workshop "${data.title}" added successfully!`);

      // Reset form
      setFormData({ title: "", description: "", date: "" });
      setImage(null);
    } catch (err) {
      setMessage(
        `❌ Error: ${err.response?.data?.message || err.message}`
      );
      console.error("Workshop upload error:", err.response || err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-8 border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Add New Workshop
      </h1>

      {message && (
        <p
          className={`mb-4 p-2 rounded text-center ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Workshop Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter workshop title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-300 outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Enter workshop description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-300 outline-none"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-300 outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Add Workshop
        </button>
      </form>
    </div>
  );
};

export default AddWorkshop;
