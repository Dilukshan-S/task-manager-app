const router = require("express").Router();
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");

// Middleware to protect routes and get user ID from JWT
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// GET all tasks for logged-in user
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(tasks);
});

// POST create a new task
router.post("/", auth, async (req, res) => {
  const { title, endTime } = req.body;
  if (!title) return res.status(400).json({ msg: "Title is required" });

  const newTask = new Task({ user: req.userId, title, endTime });
  await newTask.save();
  res.json(newTask);
});

// PUT update task (toggle completed or update title)
router.put("/:id", auth, async (req, res) => {
  const { title, completed, endTime } = req.body;
  const task = await Task.findOne({ _id: req.params.id, user: req.userId });
  if (!task) return res.status(404).json({ msg: "Task not found" });

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  if (endTime !== undefined) task.endTime = endTime;

  await task.save();
  res.json(task);
});

// DELETE a task
router.delete("/:id", auth, async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });
  if (!task) return res.status(404).json({ msg: "Task not found" });

  res.json({ msg: "Task deleted" });
});

module.exports = router;
