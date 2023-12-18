'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_id: {
        type: Sequelize.INTEGER
      },
      designation_id: {
        type: Sequelize.INTEGER
      },
      task_details: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      estimate_hours: {
        type: Sequelize.INTEGER
      },
      status_id: {
        type: Sequelize.INTEGER
      },
      hour_taken: {
        type: Sequelize.INTEGER
      },
      end_date: {
        type: Sequelize.DATE
      },
      comments: {
        type: Sequelize.STRING
      },
      attachment_url: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};