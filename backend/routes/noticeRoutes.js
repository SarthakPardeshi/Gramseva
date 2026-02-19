import express from "express";
import { createNotice, getNotices } from "../controllers/noticeController.js";
import { protect } from "../middleware/authMiddleware.js";
import {adminOnly} from "../middleware/adminMiddleware.js";

const router = express.Router();

// Only admin can create notice
router.post("/", protect, adminOnly, createNotice);

// Both admin and villager can view notices
router.get("/", protect, getNotices);

export default router;

