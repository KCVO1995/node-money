'use strict';

import { Controller } from 'egg';

export default class PostController extends Controller {
  // async index() {
  //   const ctx = this.ctx;
  //   const query = {
  //     limit: ctx.helper.parseInt(ctx.query.limit),
  //     offset: ctx.helper.parseInt(ctx.query.offset),
  //   };
  //   ctx.body = await ctx.service.post.list(query);
  // }
  //
  // async show() {
  //   const ctx = this.ctx;
  //   ctx.body = await ctx.service.post.find(ctx.helper.parseInt(ctx.params.id));
  // }

  async create() {
    const ctx = this.ctx;
    const {name} = ctx.request.body
    if (!name) {
      ctx.throw('名字不能为空', 422)
      return
    }
    const currentUser = this.ctx.state.user
    const [tag, created] = await ctx.model.Tag.findOrCreate({where: {name}, defaults: {user_id: currentUser.id}})
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
  // async destroy() {
  //   const ctx = this.ctx;
  //   const id = ctx.helper.parseInt(ctx.params.id);
  //   const user_id = ctx.helper.parseInt(ctx.request.body.user_id);
  //   await ctx.service.post.destroy({ id, user_id });
  //   ctx.status = 200;
  // }
}
