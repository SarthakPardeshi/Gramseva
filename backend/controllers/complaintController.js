import Complaint from "../models/Complaint.js";
import cloudinary from "../config/cloudinary.js";


export const createComplaint = async (req, res) => {
  try {
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
      imageUrl
    });

    res.status(201).json(complaint);

  } catch (error) {
    console.error(error); // 👈 important for debugging
    res.status(500).json({ message: error.message });
  }
};


//admin update status

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["pending", "in-progress", "resolved"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    res.json({ message: "Status updated successfully", complaint });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
