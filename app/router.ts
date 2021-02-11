'use strict';

import { Application } from 'egg';

// TODO 注册接口
// TODO 登录接口
// TODO 记账记录
export default function(app: Application) {
  // app.resources('users', '/users', app.controller.user);
  // app.resources('posts', '/posts', app.controller.post);
  const { router, controller } = app;

  router.post('/user/login', controller.user.login);
  router.post('/user/register', controller.user.register);
  // 查询
  router.get('/user', controller.user.index);
  // router.get('/user/:id', jwt, controller.user.show);
  // 生成经过md5加密后的密文
  router.get('/user/getMd5/:data', controller.user.getMd5Data);
}
