// add middlewares here related to projects
const Project = require("../projects/projects-model.js");

async function validateProjectId(req, res, next) {
  const { id } = req.params;
  try {
    const project = await Project.get(id);
    if (project) {
      req.project = project; // saves other middlewares a db trip
      next();
    } else {
      res.status(404).json({
        message: "Error getting Project id",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error getting Project ID",
      error: err.message,
    });
    next();
  }
}

function validateProject (req, res, next) {
  const { name, description, completed } = req.body
  if (!name || !name.trim()) {
    next({
      status:400,
      message: "Please fill out name field"
    })
  } else if (!description || !description.trim()) {
    next({
      status: 400,
      message: "Please fill out description field"
    })
  } else {
    req.name = name.trim(); // saves other middlewares a db trip
    req.description = description.trim(); // saves other middlewares a db trip
    req.completed = completed
    next();
  }
}

module.exports = {
  validateProjectId,
  validateProject
};
