import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/tokenServices.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
      return res.status(400).json({ msg: "All the fields are required" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ msg: "User Registered Successfully", data: user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // ✅ Access token cookie (IMPORTANT)
    res.cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production (HTTPS)
    });

    // ✅ Refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.json({ msg: "Login successful" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const refresh = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ message: "No Token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const accessToken = jwt.sign({ id: decoded.id }, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.msg });
  }
};
