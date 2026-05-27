const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Protected route accessed",
        userId: req.user.id,
    });
});

const {
    registerUser,
    loginUser,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;