const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../contoller/user.controller");

const { authMiddleware } = require("../middleware/user.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-user/:username", authMiddleware, getUser);

module.exports = router;
