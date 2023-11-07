"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_Class_Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor_Class_Courses.init(
    {
      teacherId: DataTypes.INTEGER,
      classesId: DataTypes.INTEGER,
      coursesId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor_Class_Courses",
    }
  );
  return Doctor_Class_Courses;
};
