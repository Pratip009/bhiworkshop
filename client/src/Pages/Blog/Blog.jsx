import { useEffect, useState, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaClock, FaBookOpen } from "react-icons/fa";
import Banner from "../../components/Banner";
import SpinnerLoader from "../../components/Loader";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchBlogs();
  }, []);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/blogs`);
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? `${words.slice(0, wordLimit).join(" ")}...`
      : text;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${date.getFullYear()}`;
  };

  const handleReadMore = (id) => navigate(`/blog/${id}`);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <SpinnerLoader size={35} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-medium text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-10">
      <Banner
        text="Blogs"
        imageUrl="https://img.freepik.com/free-photo/people-working-tech-brand-together_23-2150966134.jpg?semt=ais_country_boost&w=740"
      />

      <div className="grid md:grid-cols-3 gap-8 mt-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all transform flex flex-col"
            data-aos="fade-up"
          >
            <img
              src={blog.imgUrl}
              alt={blog.title}
              loading="lazy"
              className="w-full h-48 object-cover"
            />

            <div className="p-4 flex flex-col flex-grow">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {blog.category}
                </span>
                <div className="flex items-center gap-1">
                  <FaClock className="text-red-500" />
                  <span className="text-gray-400">
                    {formatDate(blog.createdAt)}
                  </span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {blog.title}
              </h2>

              <div className="flex items-center space-x-2 text-gray-600 text-sm mb-2">
                <FaUser className="text-red-500" />
                <span className="font-medium">{blog.author}</span>
              </div>

              <p className="text-gray-600 mb-4 flex-grow">
                {truncateText(blog.content, 20)}
              </p>

              <button
                onClick={() => handleReadMore(blog._id)}
                className="w-full px-6 py-3 bg-[#4ADE80] text-white font-semibold rounded-full flex items-center justify-center gap-2 transition hover:bg-green-500"
              >
                <FaBookOpen /> Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
