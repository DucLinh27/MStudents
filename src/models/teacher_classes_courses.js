"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teacher_Class_Courses extends Model {
    static associate(models) {
      // define association here
    }
  }
  Teacher_Class_Courses.init(
    {
      teacherId: DataTypes.INTEGER,
      classesId: DataTypes.INTEGER,
      coursesId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Teacher_Class_Courses",
    }
  );
  return Teacher_Class_Courses;
};
