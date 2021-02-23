'use strict';

import { Controller } from 'egg';

export default class PostController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { start_at, end_at, is_expend } = ctx.query;
    const query = {
      start_at: new Date(start_at || '2000-01-01'),
      end_at: end_at ? new Date(end_at) : new Date(),
      is_expend: is_expend ? is_expend === 'true' : undefined,
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

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const currentUser = this.ctx.state.user;
    await ctx.service.record.destroy({ id, userId: currentUser.id });
    ctx.status = 200;
  }
}
