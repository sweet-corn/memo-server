import Koa from 'koa';
import cors from '@koa/cors'; 
import bodyParser from 'koa-bodyparser';
import memoRoutes from './routes/memo';
import db from './config/db';

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(memoRoutes.routes());
app.use(memoRoutes.allowedMethods());

// 数据库同步
db.sync({ alter: true }).then(() => {
  console.log('✅ MySQL 连接成功，表已同步');
});

app.listen(3000, () => {
  console.log('🚀 Koa 服务已启动：http://localhost:3000');
});