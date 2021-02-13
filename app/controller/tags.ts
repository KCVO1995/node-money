'use strict';

import { Controller } from 'egg';

export default class PostController extends Controller {
  async index() {
    const ctx = this.ctx;
    const currentUser = this.ctx.state.user;
    if (currentUser) {
      ctx.status = 200;
      ctx.body = await ctx.model.Tag.findAll({ where: { user_id: currentUser.id } });
    } else {
      ctx.status = 401;
      ctx.body = { message: '请登录' };
    }
  }

  //
  // async show() {
  //   const ctx = this.ctx;
  //   ctx.body = await ctx.service.post.find(ctx.helper.parseInt(ctx.params.id));
  // }

  async create() {
    const ctx = this.ctx;
    const { name } = ctx.request.body;
    if (!name) {
      ctx.throw('名字不能为空', 422)
      return
    }
    const currentUser = this.ctx.state.user;
    const [ tag, created ] = await ctx.model.Tag.findOrCreate({
      where: { name, user_id: currentUser.id },
      defaults: { user_id: currentUser.id },
    });
    if (!created) {
      ctx.status = 422;
      ctx.body = {errors: ['标签名重复']};
      return
    }
    ctx.status = 201;
    ctx.body = tag;
  }

  // async update() {
  //   const ctx = this.ctx;
  //   const id = ctx.params.id;
  //   const updates = {
  //     title: ctx.request.body.title,
  //     content: ctx.request.body.content,
  //   };
  //   ctx.body = await ctx.service.post.update({ id, user_id: ctx.request.body.user_id, updates });
  // }
  //
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const currentUser = this.ctx.state.user;
    console.log(id, currentUser, 'ddd');
    const willDestroyTag = await ctx.model.Tag.findOne({ where: { id, user_id: currentUser.id } });
    console.log(willDestroyTag, 'ssss');
    willDestroyTag && willDestroyTag.destroy();
    ctx.status = 200;
  }
}
