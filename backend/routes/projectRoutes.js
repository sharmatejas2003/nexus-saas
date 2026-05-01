const router = require("express").Router();
const { protect, isAdmin } = require("../middleware/auth");

const {
  createProject,
  getProjects,
  addMember,
  deleteProject 
} = require("../controllers/projectController");

// Standard Routes
router.post("/", protect, createProject);
router.get("/", protect, getProjects);

// Admin/Member Routes
router.post("/:id/add-member", protect, isAdmin, addMember);
router.delete("/:id", protect, deleteProject);

module.exports = router;