const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imgUrl: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    totalHours: { type: String, required: true },
    credential: { type: String, required: true },
    preRequisite: { type: String, required: true },
    description: { type: String, required: true },
    content: [{ type: String, required: true }],
    certification: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
