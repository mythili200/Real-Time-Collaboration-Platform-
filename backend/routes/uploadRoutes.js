import upload  from "../middleware/fileUploadMiddleware.js";
import { uploadFile } from "../controllers/uploadController.js";
import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/upload", protect, upload.single("file"), uploadFile);

export default router;
