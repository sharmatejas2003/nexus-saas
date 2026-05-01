const User = require("../models/User");

// GET USERS
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// BAN USER
exports.banUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return res.status(404).json({ message: "User not found" });

  if (user.role === "admin")
    return res.status(403).json({ message: "Cannot ban admin" });

  user.isBanned = true;
  await user.save();

  res.json({ message: "User banned" });
};

// UNBAN USER
exports.unbanUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return res.status(404).json({ message: "User not found" });

  user.isBanned = false;
  await user.save();

  res.json({ message: "User unbanned" });
};