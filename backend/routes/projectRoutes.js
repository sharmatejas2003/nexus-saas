const router = require("express").Router();
const { protect, isAdmin } = require("../middleware/auth");
const projectController = require("../controllers/projectController");

// Destructure
const {
  createProject,
  getProjects,
  addMember,
  deleteProject 
} = projectController;

// Safety check for Node v22
if (!createProject || !getProjects || !deleteProject) {
  console.error("ERROR: Project controller functions are missing!");
}

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.post("/:id/add-member", protect, isAdmin, addMember);
router.delete("/:id", protect, deleteProject);

module.exports = router;