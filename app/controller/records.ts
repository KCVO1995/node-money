'use strict';

import { Controller } from 'egg';

export default class PostController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      start_at: ctx.query.start_at,
      end_at: ctx.query.end_at,
    };
    ctx.body = await ctx.service.record.list(query);
  }

  async create() {
    const ctx = this.ctx;
    const { tag_id, amount, note, is_expend } = ctx.request.body;
    const result = await ctx.service.record.validate({ tag_id, amount });
    if (result.length > 0) {
      ctx.status = 422;
      ctx.body = { result };
      return;
    }
    const currentUser = this.ctx.state.user;
    const newRecord = {
      amount,
      note,
      is_expend,
      tag_id,
      user_id: currentUser.id,
    };
    const record = await ctx.service.record.create(newRecord);
    ctx.status = 201;
    ctx.body = record;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const { amount, note, is_expend, tag_id } = ctx.request.body;
    const result = await ctx.service.record.validate({ tag_id, amount });
    if (result.length > 0) {
      ctx.status = 422;
      ctx.body = { result };
      return;
    }
    const updates = {
      amount,
      note,
      is_expend,
      tag_id,
    };
    console.log(updates, 'update');
    ctx.body = await ctx.service.record.update({ id, updates });
  }

  async show() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const record = await ctx.service.record.findOne(id);
    if (record) {
      ctx.body = record;
    } else {
      ctx.throw('记录不存在', 422);
    }
  }

  //
  // async destroy() {
  //   const ctx = this.ctx;
  //   const id = ctx.helper.parseInt(ctx.params.id);
  //   const user_id = ctx.helper.parseInt(ctx.request.body.user_id);
  //   await ctx.service.post.destroy({ id, user_id });
  //   ctx.status = 200;
  // }
}
