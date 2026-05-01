const Project = require("../models/Project");
const Task = require("../models/Task");

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newProject = new Project({
      name,
      description,
      owner: req.user._id // Critical: must match your Auth middleware
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id }); 
    res.json(projects); // This ensures the frontend gets an array []
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addMember = async (req, res) => {
  const project = await Project.findById(req.params.id);
  project.members.push(req.body.userId);
  await project.save();
  res.json(project);
};



exports.deleteProject = async (req, res) => {
  const projectId = req.params.id;

  // 🔥 delete all tasks of this project
  await Task.deleteMany({ project: projectId });

  // delete project
  await Project.findByIdAndDelete(projectId);

  res.json({ message: "Project and related tasks deleted" });
};