'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      required: true
    },
    userId: {
      type: DataTypes.INTEGER,
      required: true
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    expires_at: {
      type: DataTypes.DATE,
      required: true
    }
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};