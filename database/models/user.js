'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  
    static associate(models) {
      
      models.User.belongsTo(models.Status, {

        as: 'statusId',
        foreignKey: 'status'
      });

      models.User.belongsTo(models.Courses, {

        as: 'courses',
        foreignKey: 'area'
      });

    }
  }
  User.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.INTEGER,
    area: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};