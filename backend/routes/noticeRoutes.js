import express from "express";
import { createNotice, getNotices } from "../controllers/noticeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNotice);
router.get("/", protect, getNotices);

export default router;
