'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      artist: {
        type: Sequelize.STRING,
        allowNull: false
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sound: {
        type: Sequelize.STRING,
        allowNull: false
      },
      favoriteCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      playCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    return queryInterface.dropTable('Songs');
  }
};