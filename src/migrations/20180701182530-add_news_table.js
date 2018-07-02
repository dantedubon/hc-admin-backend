'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('news', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      companyId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
              model: "companies",
              key: "id"
          }
      },
      title:  { type: Sequelize.STRING, allowNull: false },
      author:  { type: Sequelize.STRING, allowNull: false },
      content:  { type: Sequelize.STRING, allowNull: false },
      image:  { type: Sequelize.BLOB, allowNull: true },
      isAccepted: { type: Sequelize.BOOLEAN, allowNull: false },
      isDeleted: { type: Sequelize.BOOLEAN, allowNull: false },
      createdAt:  { type: Sequelize.DATE, allowNull: true },
      updatedAt:  { type: Sequelize.DATE, allowNull: true },
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('news');
  }
};
