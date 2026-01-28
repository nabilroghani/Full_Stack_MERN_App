const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../contoller/user.controller");

const { authMiddleware } = require("../middleware/user.middleware");

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/get-user/:username", authMiddleware, getUser);

module.exports = route;
