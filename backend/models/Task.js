const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: String,

  status: {
    type: String,
    enum: ["Pending", "In-Progress", "Submitted", "Completed"],
    default: "Pending"
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },


  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },

  dueDate: Date

}, { timestamps: true });

module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);