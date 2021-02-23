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

  async list({ start_at, end_at, is_expend }: { start_at: Date; end_at: Date; is_expend?: boolean }) {
    const { Tag } = this.ctx.model;
    const query = {
      created_at: {
        [Op.between]: [ start_at, end_at ],
      },
      is_expend,
    };

    if (is_expend === undefined) {
      // @ts-ignore
      delete query.is_expend;
    }

    return this.ctx.model.Record.findAndCountAll({
      where: query,
      include: [ {
        model: Tag,
      } ],
    });
  }

  async create(obj) {
    return this.ctx.model.Record.create(obj);
  }

  async findOne(id) {
    return this.ctx.model.Record.findByPk(id);
  }


  async destroy({ id, userId }) {
    return this.ctx.model.Record.destroy({ where: { id, user_id: userId } });
  }

  async update({ id, updates }: { id: number; updates: object }) {
    const record = await this.ctx.model.Record.findByPk(id);
    if (!record) this.ctx.throw(404, 'record not found');
    return record.update(updates);
  }
}
