const Workshop = require("../models/Workshop");
const cloudinary = require("../config/cloudinary");

// ------------------- CREATE WORKSHOP -------------------
const createWorkshop = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload buffer to Cloudinary using a Promise wrapper
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "workshops" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
    };

    const uploadResult = await streamUpload(req.file.buffer);

    const workshop = new Workshop({
      title,
      description,
      date,
      image: uploadResult.secure_url,
      createdBy: req.user?._id,
    });

    await workshop.save();
    res.status(201).json(workshop);
  } catch (error) {
    console.error("Workshop creation error:", error);
    res.status(500).json({ message: "Error creating workshop", error });
  }
};

// ------------------- GET ALL WORKSHOPS -------------------
const getWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find().sort({ date: 1 });
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workshops", error });
  }
};

// ------------------- GET SINGLE WORKSHOP -------------------
const getWorkshopById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) return res.status(404).json({ message: "Workshop not found" });
    res.json(workshop);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workshop", error });
  }
};

// ------------------- UPDATE WORKSHOP -------------------
const updateWorkshop = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    let updateData = { title, description, date };

    if (req.file) {
      // Upload new image
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "workshops" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
      };

      const uploadResult = await streamUpload(req.file.buffer);
      updateData.image = uploadResult.secure_url;
    }

    const workshop = await Workshop.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!workshop) return res.status(404).json({ message: "Workshop not found" });
    res.json(workshop);
  } catch (error) {
    res.status(500).json({ message: "Error updating workshop", error });
  }
};

// ------------------- DELETE WORKSHOP -------------------
const deleteWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndDelete(req.params.id);
    if (!workshop) return res.status(404).json({ message: "Workshop not found" });
    res.json({ message: "Workshop deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting workshop", error });
  }
};

module.exports = {
  createWorkshop,
  getWorkshops,
  getWorkshopById,
  updateWorkshop,
  deleteWorkshop,
};
