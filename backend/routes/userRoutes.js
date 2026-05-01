const router = require("express").Router();
const { protect, isAdmin } = require("../middleware/auth");
const {
  getUsers,
  banUser,
  unbanUser
} = require("../controllers/userController");

router.get("/", protect, isAdmin, getUsers);
router.put("/ban/:id", protect, isAdmin, banUser);
router.put("/unban/:id", protect, isAdmin, unbanUser);

module.exports = router;