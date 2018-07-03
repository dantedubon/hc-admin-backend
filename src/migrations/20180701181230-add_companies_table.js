'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('companies', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name:  { type: Sequelize.STRING, allowNull: false },
      description:  { type: Sequelize.STRING, allowNull: false },
      sector:  { type: Sequelize.INTEGER, allowNull: false },
      products:  { type: Sequelize.STRING, allowNull: false },
      capitalPercentage:  { type: Sequelize.INTEGER, allowNull: false },
      employeesPercentage:  { type: Sequelize.INTEGER, allowNull: false },
      productivityPercentage:  { type: Sequelize.INTEGER, allowNull: false },
      province:  { type: Sequelize.INTEGER, allowNull: false },
      city:  { type: Sequelize.INTEGER, allowNull: false },
      address:  { type: Sequelize.STRING, allowNull: false },
      branches:  { type: Sequelize.STRING, allowNull: true },
      email:  { type: Sequelize.STRING, allowNull: false },
      primaryPhoneNumber:  { type: Sequelize.STRING, allowNull: false },
      secondaryPhoneNumber:  { type: Sequelize.STRING, allowNull: true },
      facebook:  { type: Sequelize.STRING, allowNull: true },
      instagram:  { type: Sequelize.STRING, allowNull: true },
      website:  { type: Sequelize.STRING, allowNull: true },
      image:  { type: Sequelize.BLOB, allowNull: true },
      isAccepted: { type: Sequelize.BOOLEAN, allowNull: false },
      isDeleted: { type: Sequelize.BOOLEAN, allowNull: false },
      createdAt:  { type: Sequelize.DATE, allowNull: true },
      updatedAt:  { type: Sequelize.DATE, allowNull: true },
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('companies');
  }
};
