// routes/workshopRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { auth } = require("../middleware/authMiddleware");
const {
  createWorkshop,
  getWorkshops,
  getWorkshopById,
  updateWorkshop,
  deleteWorkshop,
} = require("../controllers/workshopController");

// ✅ Admin: Create workshop (with image upload)
router.post("/", auth(["admin"]), upload.single("image"), createWorkshop);

// ✅ Public: Get all workshops
router.get("/", getWorkshops);

// ✅ Public: Get single workshop
router.get("/:id", getWorkshopById);

// ✅ Admin: Update workshop (with optional new image)
router.put("/:id", auth(["admin"]), upload.single("image"), updateWorkshop);

// ✅ Admin: Delete workshop
router.delete("/:id", auth(["admin"]), deleteWorkshop);

module.exports = router;
