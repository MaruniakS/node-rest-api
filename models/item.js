'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    completed: {
      type:  DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER
    }
  }, {});
  Item.associate = function(models) {
    Item.belongsTo(models.User, { foreignKey: 'userId'})
  };
  return Item;
};