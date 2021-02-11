'use strict';

import { Controller } from 'egg';

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
    console.log('login');
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    // 判断该用户是否存在并且密码是否正确
    const isValidUser = await ctx.service.user.validUser(username, password);
    if (isValidUser) {
      const token = app.jwt.sign({ username: username }, app.config.jwt.secret);
      ctx.status = 200;
      ctx.body = { code: 200, msg: '登录成功', token };
    } else {
      ctx.body = { 'errors': ['登录失败']};
    }
  }

  // 获取所有用户
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUser();
  }

  // 通过id获取用户
  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUser(ctx.params.id);
  }

  async getMd5Data() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getMd5Data(ctx.params.data);
  }
}
