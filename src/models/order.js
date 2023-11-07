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
      orderCode: DataTypes.STRING,
      createOn: DataTypes.DATE,
      createBy: DataTypes.STRING,
      totalPrice: DataTypes.FLOAT,
      shippingAddress: DataTypes.STRING,
      shippingPhone: DataTypes.STRING,
      deliveryOption: DataTypes.STRING,
      status: DataTypes.STRING,
      email: DataTypes.STRING,
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
