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
      orderCode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createOn: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createBy: {
        type: Sequelize.STRING,
      },
      totalPrice: {
        type: Sequelize.FLOAT,
      },
      shippingAddress: {
        type: Sequelize.STRING,
      },
      shippingPhone: {
        type: Sequelize.STRING,
      },
      book: {
        type: Sequelize.TEXT("long"),
      },
      deliveryOption: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
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
