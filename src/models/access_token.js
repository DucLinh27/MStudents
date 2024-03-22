"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Access_Token extends Model {
    static associate(models) {
      // define association here
      Access_Token.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Access_Token.init(
    {
      userId: DataTypes.INTEGER,
      token: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Access_Token",
    }
  );
  return Access_Token;
};
