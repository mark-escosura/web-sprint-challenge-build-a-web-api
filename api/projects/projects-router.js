// Write your "projects" router here!
const express = require("express");
const { validateProjectId, validateProject } = require("./projects-middleware");

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

// [POST] Returns the newly created project as the body of the response.
router.post("/", async (req, res) => {
  const project = req.body;
  try {
    if (!project.name || !project.description) {
      res.status(400).json({
        message: "Please provide a name and description",
      });
    } else {
      const newProject = await Projects.insert(project);
      res.status(201).json(newProject);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error Loading Project",
    });
  }
});

// [PUT] Returns the updated project as the body of the response.
router.put("/:id", [validateProjectId, validateProject], (req, res, next) => {
  const { id } = req.params;
  if (req.body.completed === undefined) {
    next({
      status: 400,
      message: "Project ID does not exist",
    });
  } else {
    Projects.update(id, req.body)
      .then(() => {
        return Projects.get(id);
      })
      .then((project) => {
        res.json(project);
      })
      .catch(next);
  }
});

module.exports = router;
