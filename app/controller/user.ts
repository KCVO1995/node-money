'use strict';

import { Controller } from 'egg';
import { User } from '../../typings';
import * as md5 from 'md5';

export default class UserController extends Controller {
  // 注册
  async register() {
    const ctx = this.ctx;
    const { username, password, passwordConfirmation } = ctx.request.body;
    const result = await ctx.service.user.validRegisterUser(username, password, passwordConfirmation);
    if (ctx.service.user.hasError(result)) {
      ctx.status = 422;
      ctx.body = { result };
      return;
    }
    const user = await ctx.service.user.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = user;
  }

  // 登录
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const users = await ctx.service.user.getUser() || [] as User[];
    const currentUser = users.find((user: User) => user.username === username && user.password_digest === md5(password));
    if (!currentUser) {
      ctx.throw(401);
    }
    const token = app.jwt.sign({ id: currentUser.id }, app.config.jwt.secret);
    ctx.status = 200;
    ctx.body = { code: 200, msg: '登录成功', token };
  }

  // 通过id获取用户
  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUser(ctx.params.id);
  }

}
