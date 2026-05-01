const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.isBanned) {
      return res.status(403).json({ message: "You are banned" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      token: generateToken(user),
      user
    });

  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, adminSecret } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

   const existingUser = await User.findOne({ email });
if (existingUser) {
  return res.status(400).json({ message: "User already exists" });
}

    let finalRole = "member";

    // 🔐 ADMIN SECURITY
    if (role === "admin") {
      if (adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ message: "Invalid admin secret" });
      }
      finalRole = "admin";
    }

    const user = await User.create({
      name,
      email,
      password,
      role: finalRole
    });

    res.json({
      token: generateToken(user),
      user
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration error" });
  }
};