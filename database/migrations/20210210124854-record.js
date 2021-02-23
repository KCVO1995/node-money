'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, DOUBLE, BOOLEAN } = Sequelize;
    await queryInterface.createTable('records', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      amount: DOUBLE,
      note: STRING,
      is_expend: BOOLEAN,
      tag_id: INTEGER,
      user_id: INTEGER,
      created_at: DATE(6),
      updated_at: DATE(6),
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('records');
  },
};
