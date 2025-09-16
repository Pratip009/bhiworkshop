const User = require("../models/User");
const Purchase = require("../models/Purchase");
const Course = require("../models/Course");

// GET /api/users - Fetch all users with their purchases (admin only)
exports.getUsers = async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find().select("-password").lean();

    // Fetch all purchases and populate course info
    const purchases = await Purchase.find()
      .populate("course", "title")
      .lean();

    // Map purchases to corresponding users
    const usersWithPurchases = users.map((user) => {
      const userPurchases = purchases
        .filter((p) => p.user.toString() === user._id.toString())
        .map((p) => ({
          course: p.course, // populated course with title
          purchasedAt: p.createdAt,
          workshopDate: p.workshopDate,
          timeSlot: p.timeSlot,
        }));

      return {
        ...user,
        purchasedCourses: userPurchases,
      };
    });

    res.status(200).json(usersWithPurchases);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// DELETE /api/users/:id - Delete a user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

// GET /api/users/:id - Get user profile by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Access control: Only self or admin
    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: not your profile" });
    }

    const user = await User.findById(id).select("-password").lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch user's purchases
    const userPurchases = await Purchase.find({ user: id })
      .populate("course", "title imgUrl description price")
      .lean();

    res.status(200).json({
      ...user,
      purchasedCourses: userPurchases.map((p) => ({
        course: p.course,
        purchasedAt: p.createdAt,
        workshopDate: p.workshopDate,
        timeSlot: p.timeSlot,
      })),
    });
  } catch (error) {
    console.error("❌ Error in getUserById:", error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};
