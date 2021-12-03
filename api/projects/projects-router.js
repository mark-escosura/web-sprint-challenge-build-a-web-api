// Write your "projects" router here!
const express = require("express");

// middleware

const Projects = require("./projects-model");

const router = express.Router();
// [GET] Returns an array of projects as the body of the response.
router.get("/", async (req, res) => {
    try {
        const project = await Projects.get();
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({
            message: "Error"
        })
    }
})

module.exports = router