"use strict";
const { Model } = require("sequelize");
const courses = require("./courses");
module.exports = (sequelize, DataTypes) => {
  class Contacts extends Model {
    static associate(models) {
      Contacts.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Contacts.init(
    {
      email: DataTypes.STRING,
      fullname: DataTypes.STRING,
      feedback: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Contacts",
    }
  );
  return Contacts;
};
