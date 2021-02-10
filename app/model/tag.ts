'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Tag = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(30),
      unique: true
    },
    created_at: DATE(6),
    updated_at: DATE(6),
  });

  return class extends Tag {
    static associate() {
      app.model.Tag.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' });
    }
  };
}
