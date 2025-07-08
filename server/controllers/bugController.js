const Bug = require('../models/Bug');

const createBug = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const bug = new Bug({
      title,
      description,
      priority
    });

    await bug.save();
    res.status(201).json(bug);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getBug = async (req, res) => {
  try {
    const one = await Bug.findById(req.params.id);
    if (!one) return res.status(404).json({ error: 'Bug not found' });
    res.json(one);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createBug, getAllBugs, getBug };
