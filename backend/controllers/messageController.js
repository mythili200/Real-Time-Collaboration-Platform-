import { messageModel } from "../models/messageModel.js";

export const searchMessage = async (req, res) => {
  try {
    const { keyword = "", page = 1 } = req.query;
    const limit = 10;
    const message = await messageModel
      .find({
        message: { $regex: keyword, $options: "i" },
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = messageModel.countDocuments(message);

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      message,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
