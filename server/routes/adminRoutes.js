const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware");

const {
  getStats,
  getUsers,
  deleteUser,
} = require("../controllers/adminController");

router.get(
  "/stats",
  protect,
  roleCheck("admin"),
  getStats
);

router.get(
  "/users",
  protect,
  roleCheck("admin"),
  getUsers
);

router.delete(
  "/users/:id",
  protect,
  roleCheck("admin"),
  deleteUser
);

module.exports = router;