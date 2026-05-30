const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const {
  getProfile,
  updateProfile,
  uploadResume,
} = require("../controllers/userController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

router.post("/upload-resume", protect, upload.single("resume"), uploadResume);

module.exports = router;