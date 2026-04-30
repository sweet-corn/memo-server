import Koa from 'koa';
import cors from '@koa/cors'; 
import bodyParser from 'koa-bodyparser';
import memoRoutes from './routes/memo';
import db from './config/db';

const app = new Koa();
const port = 3000;
app.use(cors());
// 手动配置跨域（比第三方库更稳定，不会因为依赖问题崩溃）
// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
//   // 处理 OPTIONS 预检请求
//   if (ctx.method === 'OPTIONS') {
//     ctx.status = 204;
//     return;
//   }
  
//   await next();
// });
app.use(bodyParser());
app.use(memoRoutes.routes());
app.use(memoRoutes.allowedMethods());

// 数据库同步
db.sync({ alter: true }).then(() => {
  console.log('✅ MySQL 连接成功，表已同步');
});

app.listen(port, () => {
  console.log(`🚀 Koa 服务已启动：http://localhost:${port}`);
});