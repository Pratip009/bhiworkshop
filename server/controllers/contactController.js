const Contact = require("../models/Contact");

// POST /contact — for users
const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const contact = new Contact({ name, email, phone, message });
    await contact.save();

    res.status(201).json({ message: "Message saved successfully." });
  } catch (error) {
    console.error("Contact form error:", error.message);
    res.status(500).json({ message: "Server error. Try again later." });
  }
};

// GET /contact — for admin
const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res.status(500).json({ message: "Failed to retrieve messages." });
  }
};
const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: "Error marking as read" });
  }
};

module.exports = {
  submitContactForm,
  getAllMessages,
  markAsRead,
};
