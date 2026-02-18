import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    category: {
      type: String,
      enum: ["road", "water", "light", "drainage", "other"]
    },
    description: String,
    imageUrl: String,
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
