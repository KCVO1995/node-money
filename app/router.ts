'use strict';

import { Application } from 'egg';

// TODO 注册接口
// TODO 登录接口
// TODO 记账记录
export default function(app: Application) {
  app.resources('users', '/users', app.controller.user);
  app.resources('posts', '/posts', app.controller.post);
}
