import User from "../models/User.js";
import Notice from "../models/Notice.js";
import Complaint from "../models/Complaint.js";

export const getStats = async (req, res) => {
    try {
        const villagers = await User.countDocuments({ role: "villager" });

        // Count notices that are NOT schemes (includes legacy notices with no type)
        const notices = await Notice.countDocuments({ type: { $ne: "Scheme" } });

        const schemes = await Notice.countDocuments({ type: "Scheme" });

        const complaints = await Complaint.countDocuments({});

        res.status(200).json({
            villagers,
            notices,
            complaints,
            schemes
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: "Error fetching stats" });
    }
};
