import { fileModel } from "../models/fileModel.js";
import cloudinary from "../config/cloudinary.js";

export const getFiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const file = await fileModel
      .find({ user: req.user._id })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.status(200).json({ msg: "File Fetched Successfully", data: file });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Files" || err.message });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const file = await fileModel.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ msg: "File Not Found" });
    }
    res.status(200).json({ url: file?.fileUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const file = await fileModel.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ msg: "File Not Found" });
    }
    await cloudinary.uploader.destroy(file?.publicId);
    await file.deleteOne();
    res.status(200).json({ msg: "File Deleted Successfully", data: file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
