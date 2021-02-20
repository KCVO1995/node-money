import { Service, Application } from 'egg';
import { Op } from 'sequelize';

export default class Record extends Service {
  app: Application;

  async validate({ tag_id, amount }) {
    const errors: string[] = [];
    if (!tag_id) errors.push('标签id不能为空');
    if (!amount) errors.push('金额不能为空');
    return errors;
  }

  async list({ start_at = new Date('2000-01-01'), end_at = new Date() }: { start_at: Date; end_at: Date; }) {
    return this.ctx.model.Record.findAndCountAll({
      where: {
        created_at: {
          [Op.between]: [ start_at, end_at ],
        },
      },
    });
  }

  async create(obj) {
    return await this.ctx.model.Record.create(obj);
  }

  async findOne(id) {
    return await this.ctx.model.Record.findByPk(id);
  }

  async update({ id, updates }: { id: number; updates: object }) {
    const record = await this.ctx.model.Record.findByPk(id);
    if (!record) this.ctx.throw(404, 'record not found');
    return record.update(updates);
  }
}
