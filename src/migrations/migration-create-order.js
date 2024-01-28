"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      totalPrice: {
        type: Sequelize.FLOAT,
      },
      courses: {
        type: Sequelize.TEXT("long"),
        get: function () {
          return JSON.parse(this.getDataValue("courses"));
        },
        set: function (value) {
          return this.setDataValue("courses", JSON.stringify(value));
        },
      },

      payment: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phonenumber: {
        type: Sequelize.INTEGER,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
