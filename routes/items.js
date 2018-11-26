var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET items listing. */
router.get('/', function(req, res, next) {
  model.Item.findAll({})
      .then(todos => res.json({
        error: false,
        data: todos
      }))
      .catch(error => res.json({
        data: [],
        error: error
      }));
});


/* POST item. */
router.post('/', function(req, res, next) {
  const {
    title,
    description
  } = req.body;
  model.Item.create({
    title: title,
    description: description
  })
      .then(item => res.status(201).json({
        error: false,
        data: item,
        message: 'New todo has been created.'
      }))
      .catch(error => res.json({
        data: [],
        error: error
      }));
});

/* GET item */

router.get('/:id', function(req, res, next) {
  const { id } = req.params;
  model.Item.findById(id)
      .then(item => {
        if (!item) {
          return res.status(404).json({
            error: true,
            message: 'Item not found'
          })
        }
        res.status(200).json({
          data: item
        })
      })
      .catch(err => res.json({
        error: true,
        message: err.message
      }))
});

/* update item. */
router.put('/:id', function(req, res, next) {
  const item_id = req.params.id;

  const { title, description } = req.body;

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
