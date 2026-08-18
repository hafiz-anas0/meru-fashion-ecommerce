const express = require("express");
const router = express.Router();

const { signup, login, logout, verifyEmail, forgotPassword, resetPassword, } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify-email/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/me", protect, (req, res) => {
    res.status(200).json({
        user: req.user,
    });
});

module.exports = router;