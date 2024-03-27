"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Allcode, { foreignKey: "roleId", as: "Role" });
      User.hasOne(models.Teacher_Infor, { foreignKey: "userId" });
      User.hasMany(models.Courses, { foreignKey: "userId" });
      User.hasMany(models.Order, { foreignKey: "userId" });
      User.hasMany(models.Comment, { foreignKey: "userId" });
      User.hasMany(models.Access_Token, { foreignKey: "userId" });
      User.hasMany(models.Contacts, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      image: DataTypes.STRING,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
