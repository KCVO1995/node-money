import * as egg from 'egg';
import { Op, Sequelize, QueryTypes, fn, col } from 'sequelize';
import 'egg-jwt';

declare module 'egg' {
  interface Application {
    model: egg.IModel & {
      db: Sequelize, // @ts-ignore
      Op: Op, Sequelize: typeof Sequelize, QueryTypes: typeof QueryTypes, fn: typeof fn, col: typeof col
    };
  }
}

type User = {
  id: number,
  username: string
  password_digest: string
  created_at: Date
  updated_at: Date
}
