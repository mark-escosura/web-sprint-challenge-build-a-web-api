// Write your "actions" router here!
const express = require("express");
const { validateActionsId } = require("./actions-middlware.js");

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
router.get("/:id", validateActionsId, async (req, res) => {
  res.status(200).json(req.action);
});

module.exports = router;
