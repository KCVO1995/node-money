'use strict';

import { Application } from 'egg';

// 注册接口
// 登录接口
// 记账记录
// tag
export default function(app: Application) {
  const { router, controller } = app;

  // user -------------
  router.post('/api/users/register', controller.user.register);
  router.post('/api/users/login', controller.user.login);
  // @ts-ignore
  router.get('/api/user', app.jwt, controller.user.show);

  // tag --------------
  // @ts-ignore
  router.resources('tags', '/api/tags', app.jwt, controller.tags);

  // record --------------
  // @ts-ignore
  router.resources('records', '/api/records', app.jwt, controller.records);
}
