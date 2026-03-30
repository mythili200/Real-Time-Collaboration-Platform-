import upload  from "../middleware/fileUploadMiddleware.js";
import { uploadFile } from "../controllers/uploadController.js";
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getFiles,
  downloadFile,
  deleteFile,
} from "../controllers/fileController.js";

const router = express.Router();
router.post("/upload", protect, upload.single("file"), uploadFile);
router.get("/all", protect, getFiles);
router.get("/:id", protect, downloadFile);
router.delete("/:id", protect, deleteFile);

export default router;
