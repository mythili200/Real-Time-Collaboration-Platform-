import express from "express";
import { authorize, protect } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/user", protect, (req, res) => {
  res.json({
    message: "User access granted",
    user: req.user,
  });
});

router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

export default router;
