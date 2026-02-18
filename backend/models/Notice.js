import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      en: String,
      hi: String,
      mr: String
    },
    description: {
      en: String,
      hi: String,
      mr: String
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;
