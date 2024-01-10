'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    
    static associate(models) {
      
      models.Courses.hasMany(models.User, {

        as: 'userC',
        foreignKey: 'area'
      });
      
    }
  }
  Courses.init({
    name: DataTypes.STRING,
    area: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Courses',
  });
  return Courses;
};