'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
      validate: {
        isEmail: true
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      required: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
      validate: {
        len: { args: [5, 25], msg: 'Username should contain 5-25 symbols.' },
        notEmpty: true
      }
    }
  }, {});
  User.associate = function(models) {
     User.hasMany(models.Item, { foreignKey: 'userId'});
  };
  return User;
};