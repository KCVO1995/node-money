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
  config.jwt = {
    // TODO secret 怎么弄
    secret: '123456',
  };
  // config.security = {
  //   csrf: {
  //     enable: false,
  //     ignoreJSON: true
  //   },
  //   // 允许访问接口的白名单
  //   domainWhiteList: ['http://localhost:8080'] // ['http://localhost:8080']
  // }
  //
  // config.cors = {
  //   credentials: true,
  // }
  //
  // const bizConfig = {
  //   // your biz config
  // };

  return {
    ...config as {},
  };
}
