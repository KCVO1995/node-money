'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, INTEGER, DATE, DOUBLE, BOOLEAN } = app.Sequelize;

  const Record = app.model.define('record', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    account: DOUBLE,
    is_expend: BOOLEAN,
    note: STRING,
    tag_id: INTEGER,
    user_id: INTEGER,
    created_at: DATE(6),
    updated_at: DATE(6),
  });

  return class extends Record {
    static associate() {
      app.model.Record.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' });
      app.model.Record.hasOne(app.model.Tag, { as: 'tag', foreignKey: 'tag_id' });
    }

    // static async findByIdWithUser(id: number, userId: number) {
    //   return await this.findOne({
    //     where: { id, user_id: userId },
    //   });
    // }
  }
}
