// add middlewares here related to actions
const Action = require("../actions/actions-model.js");

async function validateActionsId(req, res, next) {
    const { id } = req.params;
    try {
      const action = await Action.get(id);
      if (action) {
        req.action = action; // saves other middlewares a db trip
        next();
      } else {
        res.status(404).json({
          message: "Error getting Action id",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error getting Action id",
        error: err.message,
      });
      next();
    }
}

module.exports = {
  validateActionsId,
};
