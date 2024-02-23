"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("teacher_infor", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teacherId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      coursesId: {
        type: Sequelize.INTEGER,
      },
      // classesId: {
      //   type: Sequelize.INTEGER,
      // },
      // addressClasses: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      // nameClasses: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      // position: {
      //   type: Sequelize.STRING,
      // },

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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("teacher_infor");
  },
};
