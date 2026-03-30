import express from "express";
import { login, register, refresh } from "../controllers/authController.js";
import passport from "passport";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/refresh", refresh);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign({ _id: req.user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token, user: req.user });
  },
);

router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

export default router;
