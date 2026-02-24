import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
    createComplaint,
    updateComplaintStatus,
    getMyComplaints,
    getAllComplaints
} from "../controllers/complaintController.js";

import { protect } from "../middleware/authMiddleware.js"
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), createComplaint);
router.patch("/:id/status", protect, adminOnly, updateComplaintStatus);
router.get("/my", protect, getMyComplaints); // Use this for 'Track My Complaints'
router.get("/", protect, adminOnly, getAllComplaints); // Admin fetches all complaints

export default router;