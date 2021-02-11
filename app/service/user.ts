type Errors = {
  [key: string]: string[]
}
// HASH 怎么处理
import { Service } from 'egg';
import * as md5 from 'md5';
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserService extends Service {
  // 验证注册信息
  async validRegisterUser(username, password, passwordConfirmation) {
    const errors: Errors = {
      username: [],
      password: [],
      passwordConfirmation: []
    }
    const user = await this.ctx.model.User.findByUsername(username)
    if (!username) errors.username.push('用户名不能为空')
    if (user) errors.username.push('用户名已存在')
    if (!password) errors.password.push('密码不能为空')
    if (password !== passwordConfirmation) errors.passwordConfirmation.push('两次密码不相同')
    return errors;
  }
  // 新增用户
  async create(user) {
    const {username, password} = user
    const newUser = {
      username,
      password_digest: md5(password)
    }
    return this.ctx.model.User.create(newUser);
  }
  // 查询user表，验证密码和花名
  async validUser(username, password) {
    const data = await this.getUser();
    const pwd = md5(password);
    // @ts-ignore
    for (const item of data) {
      // @ts-ignore
      if (item.username === username && item.password === pwd) return true;
    }
    return false;
  }
  // 获取用户，不传id则查询所有
  async getUser(id?) {
    const { ctx } = this;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };

    if (id) {
      return await ctx.model.User.findByPk(toInt(id));
    }
    return await ctx.model.User.findAll(query);
  }
  hasError(errors: Errors) {
    const hasError = Object.values(errors).find(value => value.length > 0)
    return hasError && hasError.length > 0
  }
  // 专门对数据进行md5加密的方法，输入明文返回密文
  // getMd5Data(data) {
  //   return crypto.createHash('md5').update(data).digest('hex');
  // }
}
module.exports = UserService;
