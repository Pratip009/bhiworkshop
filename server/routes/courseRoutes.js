const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

// Public Routes
router.get("/", getCourses);          // Get all courses
router.get("/:id", getCourseById);    // Get course by ID

// Admin-Protected Routes
router.post("/", auth(["admin"]), createCourse);     // Create a new course
router.put("/:id", auth(["admin"]), updateCourse);   // Update course
router.delete("/:id", auth(["admin"]), deleteCourse); // Delete course

module.exports = router;
