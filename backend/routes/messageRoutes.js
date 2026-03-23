import express from "express";
import { searchMessage } from "../controllers/messageController.js";

const router = express.Router();
router.post("/search", searchMessage);

export default router;
