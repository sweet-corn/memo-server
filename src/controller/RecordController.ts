import Record from '../model/Record';


//小程序接口
// 1. 获取列表接口（适配小程序）
export const getRecordList = async (ctx: any) => {
  // 分页参数，小程序也可以不传，默认取10条
  const page = parseInt(ctx.query.page) || 1;
  const pageSize = parseInt(ctx.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  // 查询数据（按创建时间倒序，新的在前）
  const { rows, count } = await Record.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit: pageSize,
    offset: offset,
    // 可以根据你的小程序需求，过滤字段
    attributes: ['id', 'nickname', 'type', 'content', 'date', 'createdAt']
  });

  // 适配小程序前端的数据结构
  ctx.body = {
    list: rows,
    total: count,
    page,
    pageSize
  };
};

// 2. 新增记录接口（适配小程序）
export const createRecord = async (ctx: any) => {
  const { nickname, type, content, date } = ctx.request.body;

  // 简单校验
  if (!nickname || !type || !content) {
    ctx.status = 400;
    ctx.body = { message: '参数不全' };
    return;
  }

  // 保存到数据库，和你原有的 createMemo 保持一致
  const newRecord = await Record.create({
    nickname,
    type,
    content,
    date: date || new Date().toLocaleDateString()
  });

  ctx.body = newRecord;
};

