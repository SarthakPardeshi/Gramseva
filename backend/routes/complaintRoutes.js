import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { 
    createComplaint,
    updateComplaintStatus,
    getMyComplaints,
    getAllComplaints // 1. Add this import from your controller
} from "../controllers/complaintController.js";
import { protect } from "../middleware/authMiddleware.js"
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// 2. ADD THIS ROUTE for the Admin Complaints Page
// This handles GET http://localhost:5000/api/complaints
router.get("/", protect, adminOnly, getAllComplaints); 

router.post("/", protect, upload.single("image"), createComplaint);
router.patch("/:id/status", protect, adminOnly, updateComplaintStatus);
router.get("/my", protect, getMyComplaints);

export default router;