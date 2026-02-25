import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js"
import complaintsRoutes from "./routes/complaintRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

dotenv.config();

const app = express();   //  MUST come before app.use()

app.use(cors());
app.use(express.json());

// MongoDB Connection logic (Serverless Optimized)
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  });
  console.log(`✅ MongoDB Connected`);
};

// Apply DB connection middleware before routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    res.status(500).json({
      message: "Database connection failed! Have you whitelisted IP 0.0.0.0/0 in MongoDB Atlas yet?",
      error: err.message
    });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/complaints", complaintsRoutes);
app.use("/api/stats", statsRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `);
  });
}

export default app;