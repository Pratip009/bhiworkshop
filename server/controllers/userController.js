const User = require("../models/User");

// Fetch all users (admin only)
// Fetch all users (admin only)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate({
      path: "purchasedCourses.course", // populate nested `course` inside `purchasedCourses`
      select: "title", // fetch only the course title
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// Delete a user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

// ✅ Get user profile by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("➡️ req.params.id:", id);
    console.log("🧑 req.user:", req.user);

    // 🔒 Access control: Only allow self or admin
    if (req.user.id !== id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied: not your profile" });
    }

    // 🔍 Find user and populate purchasedCourses
    const user = await User.findById(id).select("-password").populate({
      path: "purchasedCourses.course", // ✅ populate nested course field
      model: "Course",
      select: "title imgUrl description price",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("🎯 Populated Courses:", user.purchasedCourses);

    // ✅ Return populated user data
    res.status(200).json({
      id: user._id,
      email: user.email,
      username: user.username,
      contact: user.contact,
      role: user.role,
      purchasedCourses: user.purchasedCourses || [],
    });
  } catch (error) {
    console.error("❌ Error in getUserById:", error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};
