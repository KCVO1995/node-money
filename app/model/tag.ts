'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Tag = app.model.define('tag', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(30),
    },
    record_id: INTEGER,
    user_id: INTEGER,
    created_at: DATE(6),
    updated_at: DATE(6),
  },{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return class extends Tag {
    static associate() {
      app.model.Tag.belongsTo(app.model.User, {foreignKey: 'user_id' });
      app.model.Tag.hasMany(app.model.Record);
    }
  };
}
