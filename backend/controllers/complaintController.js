import Complaint from "../models/Complaint.js";
import cloudinary from "../config/cloudinary.js";


export const createComplaint = async (req, res) => {
  try {
    //  Block admin from creating complaint
    if (req.user.role !== "villager") {
      return res.status(403).json({
        message: "Only villagers can create complaints"
      });
    }

    const { category, description } = req.body;

    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "complaints" }
      ); // imp

      imageUrl = result.secure_url;
    }

    const complaint = await Complaint.create({
      user: req.user.id,
      category,
      description,
      imageUrl,
      status: "pending"
    });

    res.status(201).json(complaint);

  } catch (error) {
    console.error(error); // 👈 important for debugging
    res.status(500).json({ message: error.message });
  }
};


export const updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    // Prevent double resolving
    if (complaint.status === "resolved") {
      return res.status(400).json({
        message: "Complaint already resolved"
      });
    }

    complaint.status = "resolved";

    await complaint.save();

    res.status(200).json({
      message: "Complaint resolved successfully",
      complaint
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
