'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Prompts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cohort: {
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.DATETIME
      },
      fists: {
        type: Sequelize.INTEGER
      },
      ones: {
        type: Sequelize.INTEGER
      },
      twos: {
        type: Sequelize.INTEGER
      },
      threes: {
        type: Sequelize.INTEGER
      },
      fours: {
        type: Sequelize.INTEGER
      },
      fives: {
        type: Sequelize.INTEGER
      },
      promptedBy: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Prompts');
  }
};