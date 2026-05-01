const router = require("express").Router();
const { protect } = require("../middleware/auth");
const { askAI } = require("../controllers/aiController");

router.post("/", protect, askAI);

module.exports = router;