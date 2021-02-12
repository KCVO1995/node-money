import { Service } from 'egg';

export default class Record extends Service {
  async validate({tag_id, amount}) {
    const errors:string[] = []
    if (!tag_id) errors.push('标签id不能为空')
    if (!amount) errors.push('金额不能为空')
    return errors
  }
  async create(obj) {
    return await this.ctx.model.Record.create(obj)
  }
}
