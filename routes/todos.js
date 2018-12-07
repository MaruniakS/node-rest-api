var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET todos listing. */
router.get('/', function(req, res, next) {
  model.Todo.findAll({
    where: {
      userId: req.userId
    }
  }).then(todos => res.json({
    error: false,
    data: todos
  })).catch(error => res.json({
    data: [],
    error: error
  }));
});


/* POST todo. */
router.post('/', function(req, res, next) {
  const {
    title,
    expires_at: expTime
  } = req.body;
  const userId = req.userId;
  const expires_at = expTime ? new Date(expTime) : Date.now();
  model.Todo.create({
    title,
    expires_at,
    userId
  }).then(todo => res.status(201).json({
    data: todo,
    message: 'New todo has been created'
  })).catch(error => res.json({
    data: null,
    error: error
  }));
});

/* GET todo */

router.get('/:id', function(req, res, next) {
  const { id } = req.params;

  model.Todo.findByPk(id)
      .then(todo => {
        isAccessible(todo, req.userId, res) && res.status(200).json({
          data: todo
        })
      })
      .catch(err => res.json({
        error: true,
        message: err.message
      }));

});

/* update todo. */
router.put('/:id', function(req, res, next) {
  const todoId = req.params.id;

  const { title, expires_at, completed } = req.body;

  model.Todo.findByPk(todoId)
      .then(todo => {
        isAccessible(todo, req.userId, res) && todo.update({title, expires_at, completed})
            .then(() => {
          res.json({
            error: false,
            message: 'todo has been updated.'
          })
        })
      })
      .catch(error => res.json({
        error: error
      }));
});


/* DELETE todo. */
router.delete('/:id', function(req, res, next) {
  const todoId = req.params.id;

  model.Todo.findByPk(todoId)
      .then(todo => {
        return isAccessible(todo, req.userId, res) && todo.destroy();
      })
      .then(() => res.json({
        error: false,
        message: 'Todo has been deleted.'
      }))
      .catch(error => res.json({
        error: error
      }));
});

const isAccessible = (todo, userId, res) => {
  if (!todo) {
     res.status(404).json({
      error: true,
      message: 'Item not found'
    });
    return false;
  } else if (todo.userId !== userId) {
     res.status(403).json({
      error: true,
      message: 'You don\'t have permissions for this todo.'
    });
    return false;
  }
  return true;
};

module.exports = router;
