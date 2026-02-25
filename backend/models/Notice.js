import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    // Combined the multilingual objects from your first schema
    title: {
      en: { type: String, required: true },
      hi: { type: String },
      mr: { type: String }
    },
    description: {
      en: { type: String, required: true },
      hi: { type: String },
      mr: { type: String }
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      enum: ["Notice", "Government GR", "Scheme"],
      default: "Notice"
    }
  },
  {
    timestamps: true // This automatically creates createdAt and updatedAt
  }
);

// This creates the TTL index on the 'createdAt' field 
// created by the { timestamps: true } option.
// 259200 seconds = 72 hours.
noticeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 259200 });

// Export only one model
const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
