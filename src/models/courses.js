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
      Courses.belongsTo(models.User, { foreignKey: "teacherId" });
    }
  }
  Courses.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      level: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      lessons: DataTypes.INTEGER,
      teacherId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Courses",
    }
  );
  return Courses;
};
