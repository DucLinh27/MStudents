"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teacher_Courses extends Model {
    static associate(models) {
      // define association here
    }
  }
  Teacher_Courses.init(
    {
      teacherId: DataTypes.INTEGER,
      coursesId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Teacher_Courses",
    }
  );
  return Teacher_Courses;
};
