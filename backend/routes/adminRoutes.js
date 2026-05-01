const router = require("express").Router();
const { protect, isAdmin } = require("../middleware/auth");


const {
  getUsers,
  banUser,
  unbanUser,
  deleteUser,
  getLogs
} = require("../controllers/adminController");

router.get("/users", protect, isAdmin, getUsers);
router.put("/ban/:id", protect, isAdmin, banUser);
router.put("/unban/:id", protect, isAdmin, unbanUser);
router.delete("/user/:id", protect, isAdmin, deleteUser);
router.get("/logs", protect, isAdmin, getLogs);

module.exports = router;