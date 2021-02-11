'use strict';

import { Application } from 'egg';

// TODO 注册接口
// TODO 登录接口
// TODO 记账记录
// TODO tag
export default function(app: Application) {
  // app.resources('users', '/users', app.controller.user);
  // app.resources('posts', '/posts', app.controller.post);
  const { router, controller } = app;

  router.post('/users/register', controller.user.register);

  router.post('/users/login', controller.user.login);
  // 查询
  router.get('/users', controller.user.index);
  // router.get('/user/:id', jwt, controller.user.show);
  // 生成经过md5加密后的密文
  router.get('/users/getMd5/:data', controller.user.getMd5Data);
}
