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
      ctx.body = { errors: result };
    } else {
      // @ts-ignore
      const { id, username: name, created_at, updated_at } = await ctx.service.user.create(ctx.request.body);
      ctx.status = 201;
      ctx.body = { id, username: name, created_at, updated_at };
    }
  }

  // 登录
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const users = await ctx.service.user.getUser() || [] as User[];
    // @ts-ignore
    const currentUser = users.find((user: User) => user.username === username && user.password_digest === md5(password));
    if (!currentUser) {
      ctx.status = 401;
      ctx.body = { errors: { password: [ '用户名和密码不匹配' ] } };
      return;
    }
    const token = app.jwt.sign({ id: currentUser.id }, app.config.jwt.secret);
    ctx.status = 200;
    ctx.body = { code: 200, msg: '登录成功', token };
  }

  // 通过id获取用户
  async show() {
    const { ctx } = this;
    const currentUser = this.ctx.state.user;
    if (currentUser) {
      ctx.status = 200;
      // @ts-ignore
      const { id, username, created_at, updated_at } = await this.ctx.service.user.getUser(currentUser.id);
      ctx.body = { id, username, created_at, updated_at };
    } else {
      ctx.status = 401;
      ctx.body = { message: '用户未登录，请登录' };
    }
  }

}
