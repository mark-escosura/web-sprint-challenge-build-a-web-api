// Write your "actions" router here!
const express = require("express");
const { validateActionId } = require("./actions-middlware.js");

const Actions = require("./actions-model.js");

const router = express.Router();

// [GET] Returns an array of actions (or an empty array) as the body of the response.
router.get("/", async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});

// [GET] Returns an action with the given `id` as the body of the response.
router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

// [POST] Returns the newly created action as the body of the response.
router.post("/", (req, res) => {
  const newAction = req.body;
  if (!newAction.project_id || !newAction.description || !newAction.notes) {
    res.status(400).json({
      message: "Please provide a project id, description, and notes",
    });
  } else {
    Actions.insert(newAction)
      .then(() => {
        res.status(201).json(newAction);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Error adding action",
        });
      });
  }
});

module.exports = router;
