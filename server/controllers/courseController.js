const Course = require("../models/Course");

// @desc    Create a new course
// @route   POST /api/courses
// @access  Admin
const createCourse = async (req, res) => {
  try {
    console.log("📥 Incoming request to create course:", req.body);
    console.log("👤 Authenticated User ID:", req.user?.id);

    const {
      title,
      imgUrl,
      price,
      duration,
      totalHours,
      calendarLength,
      classDays,
      description,
      certification,
      learningOutcomes,
      kitsIncluded,
      startDate,
      endDate,
      availableSeats,
    } = req.body;

    // Validation
    if (
      !title ||
      !imgUrl ||
      !price ||
      !duration ||
      !totalHours ||
      !calendarLength ||
      !classDays ||
      !description ||
      !certification ||
      !Array.isArray(learningOutcomes) ||
      learningOutcomes.length === 0 ||
      !startDate ||
      !endDate ||
      typeof availableSeats !== "number"
    ) {
      console.warn("⚠️ Validation failed. Missing required fields.");
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCourse = new Course({
      title,
      imgUrl,
      price,
      duration,
      totalHours,
      calendarLength,
      classDays,
      description,
      certification,
      learningOutcomes,
      kitsIncluded: kitsIncluded ?? false,
      startDate,
      endDate,
      availableSeats,
      createdBy: req.user.id,
    });

    await newCourse.save();
    console.log("✅ Course created successfully:", newCourse._id);

    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.error("❌ Error creating course:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Admin
const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    console.log("✏️ Update request for course:", courseId);
    console.log("📝 Payload:", req.body);

    const {
      title,
      imgUrl,
      price,
      duration,
      totalHours,
      calendarLength,
      classDays,
      description,
      certification,
      learningOutcomes,
      kitsIncluded,
      startDate,
      endDate,
      availableSeats,
    } = req.body;

    const updatedFields = {
      title,
      imgUrl,
      price,
      duration,
      totalHours,
      calendarLength,
      classDays,
      description,
      certification,
      learningOutcomes,
      kitsIncluded,
      startDate,
      endDate,
      availableSeats,
    };

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updatedFields,
      { new: true }
    );

    if (!updatedCourse) {
      console.warn("⚠️ Course not found for update:", courseId);
      return res.status(404).json({ message: "Course not found" });
    }

    console.log("✅ Course updated successfully:", updatedCourse._id);
    res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    console.error("❌ Error updating course:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Rest of the unchanged functions
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    console.log(`📦 Fetched ${courses.length} courses`);
    res.status(200).json(courses);
  } catch (error) {
    console.error("❌ Error fetching courses:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    console.log("🔎 Fetching course by ID:", courseId);

    const course = await Course.findById(courseId);
    if (!course) {
      console.warn("⚠️ Course not found:", courseId);
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("❌ Error fetching course:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    console.log("🗑️ Delete request for course:", courseId);

    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      console.warn("⚠️ Course not found for deletion:", courseId);
      return res.status(404).json({ message: "Course not found" });
    }

    console.log("✅ Course deleted:", course._id);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting course:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
