// add middlewares here related to actions
const Action = require("../actions/actions-model.js");

async function validateActionId(req, res, next) {
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

async function validateAction (req, res, next){
    const { project_id, description, notes, completed } = req.body
    if (req.body.project_id === undefined) {
        next({status: 400,
            message: 'missing required project id'
        })
    }
    if (!notes || !notes.trim) {
        next({status: 400,
            message: 'missing required project notes'
        })
    } else {
        req.project_id = project_id
        req.description = description.trim()
        req.notes = notes.trim()
        req.completed = completed
        next()
    }
}


module.exports = {
  validateActionId,
  validateAction,
};
