"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Replies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Replies.belongsTo(models.Videos, {
        foreignKey: "videoId",
      });
      Replies.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Replies.init(
    {
      name: DataTypes.STRING,
      videoId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      commentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Replies",
    }
  );
  return Replies;
};
