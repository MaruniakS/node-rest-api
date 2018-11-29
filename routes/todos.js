var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET items listing. */
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


/* POST item. */
router.post('/', function(req, res, next) {
  const {
    title
  } = req.body;
  const userId = req.userId;
  const expires_at = req.expires_at || Date.now();
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

/* GET item */

router.get('/:id', function(req, res, next) {
  const { id } = req.params;

  model.Todo.findById(id)
      .then(todo => {
        if (!todo) {
          return res.status(404).json({
            error: true,
            message: 'Item not found'
          })
        }
        if (todo.userId !== req.userId) {
          return res.status(403).json({
            error: true,
            message: 'You don\'t have permissions for this todo.'
          })
        }

        res.status(200).json({
          data: todo
        })
      })
      .catch(err => res.json({
        error: true,
        message: err.message
      }));

});

/* update item. */
router.put('/:id', function(req, res, next) {
  const item_id = req.params.id;

  const { title, expires_at } = req.body;

  model.Item.update({
    title: title,
    description: description
  }, {
    where: {
      id: item_id
    }
  })
      .then(item => res.json({
        error: false,
        message: 'todo has been updated.'
      }))
      .catch(error => res.json({
        error: error
      }));
});


/* GET item listing. */
router.delete('/:id', function(req, res, next) {
  const item_id = req.params.id;

  model.Item.destroy({ where: {
    id: item_id
  }})
      .then(status => res.json({
        error: false,
        message: 'todo has been delete.'
      }))
      .catch(error => res.json({
        error: error
      }));
});

module.exports = router;
