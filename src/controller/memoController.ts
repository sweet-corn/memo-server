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



