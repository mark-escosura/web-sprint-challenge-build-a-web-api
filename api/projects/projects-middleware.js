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

module.exports = {
  validateProjectId,
};
