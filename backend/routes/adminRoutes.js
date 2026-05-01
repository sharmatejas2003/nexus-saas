const router = require("express").Router();
const { protect, isAdmin } = require("../middleware/auth");

// ❌ YOU MISSED getLogs IMPORT
const {
  getUsers,
  banUser,
  unbanUser,
  deleteUser,
  getLogs // ✅ ADD THIS
} = require("../controllers/adminController");

router.get("/users", protect, isAdmin, getUsers);
router.put("/ban/:id", protect, isAdmin, banUser);
router.put("/unban/:id", protect, isAdmin, unbanUser);
router.delete("/user/:id", protect, isAdmin, deleteUser);

// ✅ NOW THIS WILL WORK
router.get("/logs", protect, isAdmin, getLogs);

module.exports = router;