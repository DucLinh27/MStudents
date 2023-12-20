"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      username: DataTypes.STRING,
      totalPrice: DataTypes.FLOAT,
      email: DataTypes.STRING,
      phonenumber: DataTypes.INTEGER,
      payment: DataTypes.STRING,
      courses: {
        type: DataTypes.TEXT("long"),
        get: function () {
          return JSON.parse(this.getDataValue("courses"));
        },
        set: function (value) {
          return this.setDataValue("courses", JSON.stringify(value));
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
