const express = require("express");
const { getUsers, deleteUser, getUserById } = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

// 🛠 Existing admin routes
router.get("/:id", auth(), getUserById);
router.get("/", auth(["admin"]), getUsers);
router.delete("/:id", auth(["admin"]), deleteUser);


// <-- Allow user to fetch their own profile

module.exports = router;
