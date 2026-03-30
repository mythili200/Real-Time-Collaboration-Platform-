import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const messageModel = mongoose.model("Message", messageSchema);
