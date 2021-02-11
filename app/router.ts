'use strict';

import { Application } from 'egg';

// 注册接口
// 登录接口
// TODO 记账记录
// TODO tag
export default function(app: Application) {
  const { router, controller } = app;

  router.post('/users/register', controller.user.register);

  router.post('/users/login', controller.user.login);
  // @ts-ignore
  router.get('/users/:id', app.jwt, controller.user.show);
}
