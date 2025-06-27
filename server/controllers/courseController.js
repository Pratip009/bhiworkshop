const Course = require("../models/Course");

// @desc    Create a new course
// @route   POST /api/courses
// @access  Admin
const createCourse = async (req, res) => {
  try {
    console.log("Incoming request to create course:", req.body); // ✅ Log request data

    const { title, imgUrl, price, duration, totalHours, credential, preRequisite, description, content, certification } = req.body;

    // Validate input
    if (!title || !price || !duration || !totalHours || !credential || !preRequisite || !description || !content || !certification) {
      console.log("Validation failed: Missing fields"); // ✅ Log validation failure
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCourse = new Course({
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
      createdBy: req.user.id, // Admin who created the course
    });

    await newCourse.save();
    console.log("Course created successfully:", newCourse); // ✅ Log success
    res.status(201).json({ message: "Course created successfully", course: newCourse });

  } catch (error) {
    console.error("Error creating course:", error.message); // ✅ Log error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    console.log("Fetching all courses..."); // ✅ Log request
    const courses = await Course.find();
    console.log("Courses retrieved:", courses.length); // ✅ Log count
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    console.log(`Fetching course with ID: ${req.params.id}`); // ✅ Log request
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      console.log("Course not found"); // ✅ Log not found case
      return res.status(404).json({ message: "Course not found" });
    }

    console.log("Course retrieved:", course); // ✅ Log success
    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Admin
const updateCourse = async (req, res) => {
  try {
    console.log(`Updating course with ID: ${req.params.id}`, req.body); // ✅ Log request

    const { title, imgUrl, price, duration, totalHours, credential, preRequisite, description, content, certification } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, imgUrl, price, duration, totalHours, credential, preRequisite, description, content, certification },
      { new: true }
    );

    if (!updatedCourse) {
      console.log("Course not found for update"); // ✅ Log not found case
      return res.status(404).json({ message: "Course not found" });
    }

    console.log("Course updated successfully:", updatedCourse); // ✅ Log success
    res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Admin
const deleteCourse = async (req, res) => {
  try {
    console.log(`Deleting course with ID: ${req.params.id}`); // ✅ Log request
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      console.log("Course not found for deletion"); // ✅ Log not found case
      return res.status(404).json({ message: "Course not found" });
    }

    console.log("Course deleted successfully:", course); // ✅ Log success
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createCourse, getCourses, getCourseById, updateCourse, deleteCourse };
