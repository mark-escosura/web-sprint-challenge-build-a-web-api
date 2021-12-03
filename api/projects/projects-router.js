// Write your "projects" router here!
const express = require("express");
const { validateProjectId } = require("./projects-middleware");

// middleware

const Projects = require("./projects-model");

const router = express.Router();
// [GET] Returns an array of projects as the body of the response.
router.get("/", async (req, res) => {
  const projects = await Projects.get();
  try {
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: err.message,
    });
  }
});

// [GET] Returns a project with the given `id` as the body of the response.
router.get("/:id", validateProjectId, async (req, res) => {
  res.status(200).json(req.project);
});

module.exports = router;
