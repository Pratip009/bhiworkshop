const cloudinary = require("../config/cloudinary");
const Gallery = require("../models/Gallery");

// Upload image
const uploadImage = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload the image to Cloudinary
    cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }

        const newImage = new Gallery({
          title,
          description,
          imageUrl: result.secure_url,
        });

        await newImage.save();
        res.status(201).json(newImage);
      }
    ).end(req.file.buffer); // Using .end() for streaming the file buffer
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get gallery images
const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete image
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params; // Get image ID from the URL parameter

    // Find the image in the database
    const image = await Gallery.findById(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete the image from Cloudinary
    const publicId = image.imageUrl.split("/").pop().split(".")[0]; // Extract public ID from URL
    await cloudinary.uploader.destroy(publicId);

    // Delete the image from the database
    await Gallery.findByIdAndDelete(id);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  uploadImage,
  getGalleryImages,
  deleteImage,
};
