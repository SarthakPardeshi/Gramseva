import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "villager"],
    default: "villager"
  },
  preferredLanguage: {
    type: String,
    enum: ["en", "hi", "mr"],
    default: "mr"
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
