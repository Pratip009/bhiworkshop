/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";

const AddBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    imgUrl: "",
    content: "",
    author: "",
    category: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/blogs`);
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImageToCloudinary = async () => {
    if (!imageFile) {
      alert("No image selected");
      return "";
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "blog_images_upload");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dqzl0pxhr/image/upload",
        { method: "POST", body: formData }
      );

      const data = await response.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error(data.error?.message || "Image upload failed");
      }
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      alert(`Image upload failed: ${error.message}`);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    try {
      setUploading(true);
      const imageUrl = await uploadImageToCloudinary();

      if (!imageUrl) {
        alert("Image upload failed. Please try again.");
        setUploading(false);
        return;
      }

      const newBlog = { ...blog, imgUrl: imageUrl };

      await axios.post(`${API_URL}/blogs`, newBlog, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Blog added successfully!");
      fetchBlogs();

      setBlog({ title: "", imgUrl: "", content: "", author: "", category: "" });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding blog:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to add blog");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Blog deleted successfully!");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Blog</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            className="border p-2 rounded-md"
            type="text"
            name="title"
            placeholder="Title"
            value={blog.title}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded-md"
            type="text"
            name="author"
            placeholder="Author"
            value={blog.author}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded-md"
            type="text"
            name="category"
            placeholder="Category"
            value={blog.category}
            onChange={handleChange}
            required
          />
          <textarea
            className="border p-2 rounded-md col-span-2"
            name="content"
            placeholder="Content"
            value={blog.content}
            onChange={handleChange}
            required
          ></textarea>
          <input
            className="border p-2 rounded-md col-span-2"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-40 h-40 object-cover mt-2 mx-auto rounded-md border"
            />
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md col-span-2 hover:bg-blue-600"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Blog"}
          </button>
        </form>
      </div>
      <div className="max-w-4xl mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Blogs List</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Title</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((c) => (
              <tr key={c._id} className="hover:bg-gray-100">
                <td className="border p-2">{c.title}</td>
                <td className="border p-2">
                  {c.imgUrl ? (
                    <img
                      src={c.imgUrl}
                      alt={c.title}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border p-2">{c.author}</td>
                <td className="border p-2">{c.category}</td>
                <td className="border p-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                    onClick={() => handleDelete(c._id)}
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

export default AddBlog;
