'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    name: DataTypes.STRING,
    getId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    except: DataTypes.INTEGER
  }, {});
  Person.associate = function(models) {
    Person.hasOne(Person, { as: 'Receiver' })
    // associations can be defined here
  };
  return Person;
};