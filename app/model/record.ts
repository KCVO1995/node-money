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
    amount: DOUBLE,
    is_expend: BOOLEAN,
    note: STRING,
    tag_id: INTEGER,
    user_id: INTEGER,
    created_at: DATE(6),
    updated_at: DATE(6),
  },{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return class extends Record {
    static associate() {
      app.model.Record.belongsTo(app.model.User, { foreignKey: 'user_id' });
      app.model.Record.belongsTo(app.model.Tag);
    }

    // static async findByIdWithUser(id: number, userId: number) {
    //   return await this.findOne({
    //     where: { id, user_id: userId },
    //   });
    // }
  }
}
