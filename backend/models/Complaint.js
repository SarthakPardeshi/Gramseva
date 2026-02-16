const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  category: String,
  description: String,
  imageUrl: String,
  status: {
    type: String,
    enum: ["pending", "in-progress", "resolved"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);
