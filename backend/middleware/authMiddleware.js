import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";


export const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Access Denied" });
    }
    next();
  };
};
