import Memo from '../model/Memo';

// 1. 分页查询笔记列表
export const getMemoList = async (ctx:any) => {
  // 前端传的分页参数
  const page = parseInt(ctx.query.page) || 1;
  const pageSize = parseInt(ctx.query.pageSize) || 10;

  // 计算偏移量
  const offset = (page - 1) * pageSize;

  // 查询数据 + 总条数
  const { rows, count } = await Memo.findAndCountAll({
    order: [['isTop', 'DESC'], ['createdAt', 'DESC']],
    limit: pageSize,
    offset: offset,
  });

  return {
    list: rows,
    total: count, // 总条数
    page,
    pageSize,
  };
};
// 2. 根据ID获取详情
export const getMemoById = async (id: number | string) => {
  return await Memo.findByPk(id);
};
export const createMemo = async (data: any) => {
  return await Memo.create(data);
};

export const updateMemo = async (id: number, data: any) => {
  return await Memo.update(data, { where: { id } });
};

export const deleteMemo = async (id: number) => {
  return await Memo.destroy({ where: { id } });
};



//小程序接口
// 1. 获取列表接口（适配小程序）
export const getRecordList = async (ctx: any) => {
  // 分页参数，小程序也可以不传，默认取10条
  const page = parseInt(ctx.query.page) || 1;
  const pageSize = parseInt(ctx.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  // 查询数据（按创建时间倒序，新的在前）
  const { rows, count } = await Memo.findAndCountAll({
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
  const newMemo = await Memo.create({
    nickname,
    type,
    content,
    date: date || new Date().toLocaleDateString()
  });

  ctx.body = newMemo;
};

