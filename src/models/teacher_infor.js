"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teacher_Infor extends Model {
    static associate(models) {
      // define association here
      Teacher_Infor.belongsTo(models.User, { foreignKey: "teacherId" });
    }
  }
  Teacher_Infor.init(
    {
      teacherId: DataTypes.INTEGER,
      coursesId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      level: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Teacher_Infor",
      freezeTableName: true,
    }
  );
  return Teacher_Infor;
};
