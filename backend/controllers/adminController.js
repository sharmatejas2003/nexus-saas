const User = require("../models/User");
const Log = require("../models/Log");

// GET USERS
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// BAN USER
exports.banUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.role === "admin") return res.status(403).json({ message: "Cannot ban admin" });

  user.isBanned = true;
  await user.save();

  await Log.create({
    action: `Banned user ${user.email}`,
    user: req.user.email || req.user.name
  });

  res.json(user);
};

// UNBAN USER
exports.unbanUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  user.isBanned = false;
  await user.save();

  await Log.create({
    action: `Unbanned user ${user.email}`,
    user: req.user.email || req.user.name
  });

  res.json(user);
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const userToDelete = req.params.id;
    const adminId = req.user.id; // From your auth middleware

    // Prevent self-deletion
    if (userToDelete === adminId) {
      return res.status(400).json({ 
        message: "Security Error: You cannot delete your own admin account." 
      });
    }

    await User.findByIdAndDelete(userToDelete);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// GET LOGS
exports.getLogs = async (req, res) => {
  const logs = await Log.find().sort({ createdAt: -1 });
  res.json(logs);
};