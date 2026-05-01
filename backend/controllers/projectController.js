const Project = require("../models/Project");
const Task = require("../models/Task");

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.id,   // 🔥 REQUIRED
      members: [req.user.id]    // 🔥 REQUIRED
    });

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Project creation failed" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id   // 🔥 IMPORTANT
    });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
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