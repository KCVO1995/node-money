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
      unique: true,
    },
    password_digest: STRING,
    created_at: DATE(6),
    updated_at: DATE(6),
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return class extends User {
    id: any;

    static associate() {
      app.model.User.hasMany(app.model.Record);
      app.model.User.hasMany(app.model.Tag);
    }

    static async findByUsername(username: string) {
      return this.findOne({
        where: { username },
      });
    }
  };
}
