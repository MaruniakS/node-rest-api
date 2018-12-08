var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Op = require('sequelize').Op;

var model = require('../models/index');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign_up', function(req, res, next) {
  const { firstName, lastName, username, email, password } = req.body;
  model.User.findOne({
    where: {
      [Op.or]: [{ username }, { email }]
    }
  }).then(user => {
    if (user) {
      return res.status(422).send({
        error: true,
        message: 'User with this name or email already exists'
      })
    }

    model.User.create({
      password: bcrypt.hashSync(password, 8),
      firstName,
      lastName,
      username,
      email
    }).then(user => {
      return res.status(201).send({
        message: 'User created',
        user
      })
    })
        .catch(err => {
          res.status(422).send({err});
        })

  }).catch(err => {
    res.status(500).send({err});
  })
});

router.post('/sign_in', function(req, res, next) {
  model.User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({
        message: 'User not Found'
      })
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        auth: false,
        message: 'Invalid Password'
      })
    }

    const token = jwt.sign({ id: user.id }, 'secret123', {expiresIn: 60 * 60 });
    res.status(200).send({
      auth: true,
      token,
      user
    })
  })
});

module.exports = router;
