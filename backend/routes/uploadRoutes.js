import { upload } from "../middleware/fileUploadMiddleware";
import { uploadFile } from "../controllers/uploadController";
import express from "express";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();
router.post("/upload", protect, upload.single("file"), uploadFile);

export default router;
