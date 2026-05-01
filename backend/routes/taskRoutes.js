const router = require("express").Router();
const { protect } = require("../middleware/auth");
const { 
  createTask, 
  createManyTasks, 
  updateTask, 
  getTasksByProject 
} = require("../controllers/taskController");

// ✅ Order matters: Specific strings like "bulk" must come before parameters like ":id"
router.post("/bulk", protect, createManyTasks);
router.post("/", protect, createTask);

router.put("/:id", protect, updateTask);
router.get("/:projectId", protect, getTasksByProject); 

module.exports = router;