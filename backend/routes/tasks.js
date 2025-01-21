const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Create a new task
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Task deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
