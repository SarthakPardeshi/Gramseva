import Notice from "../models/Notice.js";

export const createNotice = async (req, res) => {
  try {
    const { title, description, type } = req.body;

    const notice = await Notice.create({
      title,
      description,
      type,
      createdBy: req.user.id
    });

    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().populate("createdBy", "name").sort({ createdAt: -1 }); // imp
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

