const express = require("express");
const router = express.Router();
const { createTodo, getTodo, updateTodo, deleteTodo } = require("../contoller/todo.controller");
const { authMiddleware } = require("../middleware/user.middleware"); 

router.post("/create", authMiddleware, createTodo); 
router.get("/get", authMiddleware, getTodo);
router.put("/update/:id", authMiddleware, updateTodo); 
router.delete("/delete/:id", authMiddleware, deleteTodo);
module.exports = router;