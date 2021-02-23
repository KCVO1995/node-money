'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('tags', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(30) },
      user_id: INTEGER,
      record_id: INTEGER,
      created_at: DATE(6),
      updated_at: DATE(6),
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('tags');
  },
};
