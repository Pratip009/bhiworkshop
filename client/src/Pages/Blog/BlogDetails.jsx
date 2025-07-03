import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ Import useParams
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams(); // ✅ Extract ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    import.meta.env.VITE_API_URL || "https://bhiworkshop-1.onrender.com";

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/blogs/${id}`); // ✅ Correct path
        console.log("API Response:", response.data); // ✅ Inspect response
        setBlog(response.data); // Ensure this matches response structure
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError("Blog not found");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center text-2xl mt-10">Loading...</p>;
  }

  if (error) {
    return (
      <div className="text-center text-2xl text-red-500 mt-10">{error}</div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${date.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 font-[Nunito]">
      <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center leading-tight px-6 font-[Quicksand]">
        {blog.title}
      </h1>

      <div className="flex flex-wrap justify-center items-center text-gray-600 text-sm space-x-3 mb-8">
        <span className="font-semibold text-gray-900">{blog.author}</span>
        <span>•</span>
        <span>{formatDate(blog.createdAt)}</span>
        <span>•</span>
        <span className="px-3 py-1 bg-[#4ADE80] text-white rounded-full text-xs font-semibold">
          {blog.category}
        </span>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <img
          src={blog.imgUrl}
          alt={blog.title}
          className="w-full h-[500px] object-cover rounded-lg shadow-md"
        />
      </div>

      <p className="text-xl text-gray-700 italic text-center my-8 px-6 mt-4">
        {blog.description}
      </p>

      <div className="w-full max-w-5xl mx-auto text-lg leading-relaxed text-gray-800 px-6">
        {blog.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-6">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default BlogDetails;
