"use strict";
const { Model } = require("sequelize");
const courses = require("./courses");
module.exports = (sequelize, DataTypes) => {
  class Videos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
