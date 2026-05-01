const Task = require("../models/Task");

exports.getDashboard = async (req, res) => {
  try {

    const tasks = await Task.find({ createdBy: req.user.id });

    const total = tasks.length;
    

    const completed = tasks.filter(t => t.status === "Completed").length;
    const submitted = tasks.filter(t => t.status === "Submitted").length;

   
    const pending = tasks.filter(t => 
      t.status === "Pending" || t.status === "In Progress"
    ).length;

  
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