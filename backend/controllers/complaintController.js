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

    const { status } = req.body;

    // Check if status is provided, otherwise just toggle or stick to resolved
    if (status) {
      complaint.status = status;
    } else {
      complaint.status = "resolved";
    }

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


export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("user", "name mobile").sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
