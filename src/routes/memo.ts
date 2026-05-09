import Router from 'koa-router';
import { getMemoList, getMemoById,createMemo, updateMemo, deleteMemo } from '../controller/memoController';
import { getRecordList, createRecord } from '../controller/RecordController';


const router = new Router(); // 这里不要写 prefix！

// 完整写全路径
router.get('/api/memo/list', async (ctx) => {
  const data = await getMemoList(ctx);
  ctx.body = { code: 0, data, msg: 'success' };
});
// 根据ID获取详情
router.get('/api/memo/detail/:id',  async (ctx) => {
  const data = await getMemoById(ctx.params.id);
  ctx.body = { code: 0, data, msg: 'success' };
});
router.post('/api/memo/add', async (ctx) => {
  await createMemo(ctx.request.body);
  ctx.body = { code: 0, msg: '添加成功' };
});

router.post('/api/memo/update/:id', async (ctx) => {
  await updateMemo(Number(ctx.params.id), ctx.request.body);
  ctx.body = { code: 0, msg: '修改成功' };
});

router.delete('/api/memo/delete/:id', async (ctx) => {
  await deleteMemo(Number(ctx.params.id));
  ctx.body = { code: 0, msg: '删除成功' };
});
//小程序接口
// 获取列表（小程序GET请求）
router.get('/api/list', getRecordList);

// 新增记录（小程序POST请求）
router.post('/api/add', createRecord);
export default router;