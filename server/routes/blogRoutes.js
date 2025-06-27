const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// Public Routes
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// Admin Routes (Protected)
router.post("/", auth(["admin"]), upload.single("image"), createBlog);
router.put("/:id", auth(["admin"]), upload.single("image"), updateBlog);
router.delete("/:id", auth(["admin"]), deleteBlog);

module.exports = router;
