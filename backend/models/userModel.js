import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    googleId: String,
    avatar: String,
  },
  { timestamps: true },
);

// userSchema.pre("save", async function () {
//   this.password = bcrypt.hash(this.password, 10);
// });

export const userModel = mongoose.model("Users", userSchema);
