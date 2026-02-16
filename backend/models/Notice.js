const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
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
  fileUrl: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Notice", noticeSchema);
