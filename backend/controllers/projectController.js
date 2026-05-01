const Project = require("../models/Project");
const Task = require("../models/Task");

const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newProject = new Project({
      name,
      description,
      owner: req.user._id 
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id }); 
    res.json(projects); 
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const addMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    project.members.push(req.body.userId);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    await Task.deleteMany({ project: projectId });
    await Project.findByIdAndDelete(projectId);
    res.json({ message: "Project and related tasks deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// EXPLICIT EXPORT - This is the "Fix"
module.exports = {
  createProject,
  getProjects,
  addMember,
  deleteProject
};