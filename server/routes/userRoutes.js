const express = require("express");
const { getUsers, deleteUser } = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Explicitly pass "admin" role for authentication
router.get("/", auth(["admin"]), getUsers);
router.delete("/:id", auth(["admin"]), deleteUser);

module.exports = router;
