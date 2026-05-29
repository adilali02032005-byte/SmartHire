const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Protected route accessed",
        userId: req.user.id,
    });
});

const {
    registerUser,
    loginUser,
    uploadResume
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post(
    "/upload-resume",
    protect,
    upload.single("resume"),
    uploadResume
);

module.exports = router;