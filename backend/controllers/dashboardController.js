const Task = require("../models/task");

exports.getDashboard = async (req, res) => {
  try {
    // Filter by createdBy so users see their own project stats
    const tasks = await Task.find({ createdBy: req.user.id });

    const total = tasks.length;
    
    // Exact match for your dropdown labels
    const completed = tasks.filter(t => t.status === "Completed").length;
    const submitted = tasks.filter(t => t.status === "Submitted").length;

    // Everything else (Pending, In Progress) goes here
    const pending = tasks.filter(t => 
      t.status === "Pending" || t.status === "In Progress"
    ).length;

    // Include overdue logic if needed, otherwise this object is ready
    res.json({ 
      total, 
      completed, 
      submitted, 
      pending,
      overdue: 0 
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};