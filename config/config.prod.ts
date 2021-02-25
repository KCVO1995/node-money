'use strict';

import { EggAppConfig, PowerPartial } from 'egg';

export default function(appInfo: EggAppConfig) {
  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = appInfo.name + '486135';

  config.sequelize = {
    database: 'money_production',
    dialect: 'mysql',
    host: '127.0.0.1',
    password: 'kcvo',
    port: 3307,
  };

  return {
    ...config as {},
  };
}
