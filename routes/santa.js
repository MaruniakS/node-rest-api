var express = require('express');
var router = express.Router();
var _ = require('lodash');
var model = require('../models/index');

router.get('/olivye/secret-santa', function(req, res, next) {
  const id = parseInt(req.query.id);
  if (!id) return res.status(422).send({
    'message': 'Please, provide me with your id!'
  });
  model.Person.findAll()
      .then(people => {
        const personId = _.findIndex(people, ['getId', id]);
        const santa = people[personId];
        if (personId === -1 || !santa) return res.status(404).send({
          'message': 'No person with this id. Please contact Stas'
        });
        if (santa.receiverId) {
          const resId = _.findIndex(people, ['id', santa.receiverId]);
          return res.status(200).send({
            message: 'You have to present a gift to: ' + people[resId].name
          })
        }

        const exceptId = _.findIndex(people, ['getId', santa.except]);
        const exceptPerson = (people[exceptId] || {}).id;

        const allIds = people.map(i => i.id);
        const takenIds = people.map(i => i.receiverId);
        const availableIds = _.difference(allIds, [...takenIds, santa.id, exceptPerson]);

        if (!availableIds.length) return res.status(500).send({
          message: 'No more available people. Please, contact with Stas'
        });

        const randomId = _.sample(availableIds);
        const receiver = people[_.findIndex(people, ['id', randomId])];

        santa.update({ receiverId: randomId })
            .then(() => {
              return res.status(200).send({
                message: 'You have to present a gift to: ' + receiver.name
              })
            })
      })
      .catch(err => res.status(500).send({err}));

});

module.exports = router;