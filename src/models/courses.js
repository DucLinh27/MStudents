"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Courses.hasMany(models.Videos, {
        foreignKey: "coursesId",
        as: "videos",
      });
    }
  }
  Courses.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      descriptionHTML: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
      teacherId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Courses",
    }
  );
  return Courses;
};
