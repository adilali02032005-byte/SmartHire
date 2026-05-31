const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware");
const {getStats} = require("../controllers/adminController");

router.get(
    "/stats",
    protect,
    roleCheck("admin"),
    getStats,
);

module.exports = router;