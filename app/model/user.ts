'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING(30),
      unique: true
    },
    password_digest: STRING,
    created_at: DATE(6),
    updated_at: DATE(6),
  });

  return class extends User {
    static associate() {
      app.model.User.hasMany(app.model.Record, { as: 'records' });
      app.model.User.hasMany(app.model.Tag, { as: 'tags' });
    }
    static async findByUsername(username: string) {
      return await this.findOne({
        where: { username }
      });
    }
  };
}
