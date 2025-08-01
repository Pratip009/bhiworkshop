const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imgUrl: { type: String, required: true },
    description: { type: String, required: true },

    // What you will learn (bullet points)
    learningOutcomes: [{ type: String, required: true }],

    // Timing & Schedule
    totalHours: { type: String, required: true },        // e.g., "40 Hours"
    duration: { type: String, required: true },          // e.g., "8 Weeks"
    calendarLength: { type: String, required: true },    // e.g., "8 weeks"
    classDays: { type: String, required: true },         // e.g., "Morning, Evening and Weekends"

    // Certification
    certification: { type: String, required: true },     // e.g., "Certificate of Completion"
    kitsIncluded: { type: Boolean, default: false },     // true or false

    // Pricing
    price: { type: Number, required: true },

    // Metadata
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // New fields
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    availableSeats: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
