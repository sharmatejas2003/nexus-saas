const Task = require("../models/Task");

// ✅ CREATE SINGLE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, project } = req.body;
    const task = await Task.create({
      title,
      description,
      assignedTo,
      project,
      status: "Pending",
      createdBy: req.user.id
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Task creation failed" });
  }
};

// ✅ CREATE MULTIPLE TASKS (Bulk) - Use this for AI results
exports.createManyTasks = async (req, res) => {
  try {
    const { tasks, project } = req.body; 
    const taskObjects = tasks.map(title => ({
      title,
      project,
      createdBy: req.user.id,
      status: "Pending"
    }));
    const createdTasks = await Task.insertMany(taskObjects);
    res.status(201).json(createdTasks);
  } catch (err) {
    res.status(500).json({ message: "Bulk creation failed" });
  }
};

// ✅ GET TASKS BY PROJECT
exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// ✅ UPDATE TASK (Modern syntax to fix Mongoose warnings)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' } 
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};