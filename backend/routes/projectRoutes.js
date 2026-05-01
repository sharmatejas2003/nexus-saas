const router = require("express").Router();
const { protect, isAdmin } = require("../middleware/auth");

// ❌ YOU FORGOT deleteProject HERE
const {
  createProject,
  getProjects,
  addMember,
  deleteProject // ✅ ADD THIS
} = require("../controllers/projectController");

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.post("/:id/add-member", protect, isAdmin, addMember);

// ✅ NOW THIS WILL WORK
router.delete("/:id", protect, deleteProject);

module.exports = router;