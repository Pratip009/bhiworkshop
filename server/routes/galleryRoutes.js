// routes/galleryRoutes.js
const express = require("express");
const router = express.Router();
const galleryUpload = require("../middleware/galleryMiddleware");
const { auth } = require("../middleware/authMiddleware");
const {
  uploadImage,
  getGalleryImages,
  deleteImage,
} = require("../controllers/galleryController");

router.post("/", auth(["admin"]), galleryUpload.single("image"), uploadImage);
router.get("/", getGalleryImages);
router.delete("/:id", auth(["admin"]), deleteImage);
module.exports = router;
