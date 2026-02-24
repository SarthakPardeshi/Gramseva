import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js"
import complaintsRoutes from "./routes/complaintRoutes.js";  

dotenv.config();

const app = express();   //  MUST come before app.use()

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/complaints", complaintsRoutes);
//imp:  why we use /api every time because we want to maintain a clean and organized structure for our API endpoints. By prefixing our routes with "/api", we can easily distinguish between routes that serve the frontend (like static files) and routes that serve the backend API. This also helps in versioning our API in the future if needed (e.g., "/api/v1/complaint").


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err) );

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
