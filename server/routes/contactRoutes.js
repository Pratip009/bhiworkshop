const express = require("express");
const {
  submitContactForm,
  getAllMessages,
  markAsRead
} = require("../controllers/contactController");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", submitContactForm);
router.get("/", auth(["admin"]), getAllMessages);
// In contactRoutes.js
router.patch("/:id/read", auth(["admin"]), markAsRead);

module.exports = router;
