'use strict';

import { EggAppConfig, PowerPartial } from 'egg';

export default function() {
  const config = {} as PowerPartial<EggAppConfig>;

  config.sequelize = {
    database: 'money_test',
    dialect: 'mysql',
    host: '127.0.0.1',
    password: 'kcvo',
    port: 3306
  };

  return config;
}
