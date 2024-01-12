'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
  class Status extends Model {
    
    static associate(models) {
      
      models.Status.hasMany(models.User, {

        as: 'userS',
        foreignKey: 'status'
      });

    }
  }
  Status.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};