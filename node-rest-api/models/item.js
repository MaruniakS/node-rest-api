'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};