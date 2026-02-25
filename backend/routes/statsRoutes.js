import express from "express";
import User from "../models/User.js";
import Notice from "../models/Notice.js";
import Complaint from "../models/Complaint.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // We use Promise.all to fetch all counts simultaneously for better performance
    const [villagerCount, noticeCount, complaintCount, schemeCount] = await Promise.all([
      User.countDocuments({ role: 'villager' }),
      Notice.countDocuments(),
      Complaint.countDocuments(),
      Notice.countDocuments({ type: "Scheme" })
    ]);

    res.status(200).json({
      villagers: villagerCount,
      notices: noticeCount,
      complaints: complaintCount,
      schemes: schemeCount
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching live status", error: error.message });
  }
});

export default router;