import cloudinary from "../config/cloudinary.js";
import File from "../models/File.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      async (error, result) => {
        if (error) return res.status(500).json({ error });

        const file = await File.create({
          user: req.user._id,
          fileUrl: result.secure_url,
          publicId: result.public_id,
          originalName: req.file.originalname,
        });

        res.json(file);
      },
    );

    result.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
