'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: STRING(30), unique: true },
      password_digest: STRING,
      created_at: DATE(6),
      updated_at: DATE(6),
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
