import express from "express";
import { login, register, refresh } from "../controllers/authController";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/refresh", refresh);

export default router;
