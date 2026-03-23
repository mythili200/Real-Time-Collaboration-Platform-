import mongoose, { Schema } from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    fileUrl: String,
    publicId: String,
    originalName: String,
  },
  { timestamps: true },
);

export const fileModel = mongoose.model("File", fileSchema);
