// models/Workshop.js
import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL or file path of uploaded image
      required: true,
    },
    date: {
      type: Date, // date of the workshop
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to Admin who created it
    },
  },
  { timestamps: true }
);

export default mongoose.model("Workshop", workshopSchema);
