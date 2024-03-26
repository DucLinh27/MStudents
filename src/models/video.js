"use strict";
const { Model } = require("sequelize");
const courses = require("./courses");
module.exports = (sequelize, DataTypes) => {
  class Videos extends Model {
    static associate(models) {
      Videos.belongsTo(models.Courses, {
        foreignKey: "coursesId",
        as: "courses",
      });
    }
  }
  Videos.init(
    {
      name: DataTypes.STRING,
      video: DataTypes.STRING,
      coursesId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Videos",
    }
  );
  return Videos;
};
