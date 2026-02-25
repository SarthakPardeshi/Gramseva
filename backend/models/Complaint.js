import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    category: {
      type: String,
      enum: ["road", "water", "light", "drainage", "other"],
      required: true
    },
    description: { type: String, required: true },
    imageUrl: String,
    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending"
    },
    // We add a specific field to track when it was finished
    resolvedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

// This index will ONLY trigger for documents that have a 'resolvedAt' value.
// It will delete the document 72 hours (259200 seconds) after 'resolvedAt'.
complaintSchema.index({ resolvedAt: 1 }, { expireAfterSeconds: 259200 });

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;