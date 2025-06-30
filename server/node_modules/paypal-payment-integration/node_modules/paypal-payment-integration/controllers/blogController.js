const Blog = require("../models/Blog");
const cloudinary = require("../config/cloudinary");

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Public
const createBlog = async (req, res) => {
  try {
    console.log("Incoming request to create blog:", req.body);

    const { title, content, author, category, imgUrl } = req.body;
    if (!title || !content || !author || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = imgUrl || null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    if (!imageUrl) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newBlog = new Blog({ title, imgUrl: imageUrl, content, author, category });
    await newBlog.save();

    console.log("Blog created successfully:", newBlog);
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    console.log("Fetching all blogs...");
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get blog by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
  try {
    console.log(`Fetching blog with ID: ${req.params.id}`);
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Admin
const updateBlog = async (req, res) => {
  try {
    console.log(`Updating blog with ID: ${req.params.id}`, req.body);
    const { title, content, author, category, imgUrl } = req.body;
    const existingBlog = await Blog.findById(req.params.id);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    let imageUrl = imgUrl || existingBlog.imgUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, imgUrl: imageUrl, content, author, category },
      { new: true }
    );

    console.log("Blog updated successfully:", updatedBlog);
    res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Admin
const deleteBlog = async (req, res) => {
  try {
    console.log(`Deleting blog with ID: ${req.params.id}`);
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
