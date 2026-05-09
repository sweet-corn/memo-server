import { DataTypes, Sequelize } from 'sequelize';
import dotenv from 'dotenv';
//import mysql from 'mysql2/promise';
dotenv.config();

const DB_NAME = process.env.DB_NAME!;

// 数据库配置 railway
const DB_CONFIG = {
  PGDATA: "/var/lib/postgresql/data/pgdata",
  PGDATABASE: "railway",//对应DB_NAME
  PGHOST: "postgres.railway.internal",//DB_HOST
  PGPASSWORD:"dKXyQSSZjabrimDWNFordzwHDIJAkbGx",//DB_PWD
  PGPORT:5432,//DB_PORT
  PGUSER:"postgres",//DB_USER
};

// 先创建数据库（不存在就创建）
// const initDB = async () => {
//   const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PWD,
//   });
//   await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
//   await connection.end();
// };

// initDB();

// 连接数据库
// const sequelize = new Sequelize(
//   DB_NAME,
//   process.env.DB_USER!,
//   process.env.DB_PWD!,
//   // {
//   //   host: process.env.DB_HOST,
//   //   dialect: 'mysql',
//   //   logging: false
//   // },
//   {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//     port: parseInt(process.env.DB_PORT || '5432'), // PostgreSQL 默认 5432
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false // Railway 必须加这个
//       }
//     },
//     logging: false
//   }
// );
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PWD!,
  {
    host: process.env.DB_HOST!,
    dialect: 'postgres', // 必须改成 postgres
    port: parseInt(process.env.DB_PORT || '5432'), // PostgreSQL 默认 5432
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Railway 必须加这个
      }
    },
    logging: false
  }
);
// ------------------------------
// 定义用户表模型（自动建表）
// ------------------------------
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
const Record = sequelize.define('Record', {
  // 记录类型：日常/体重
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '记录类型：daily/weight'
  },
  // 内容：文字或体重数字
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '记录内容'
  },
  // 微信昵称
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '发布者昵称'
  },
  // 记录日期（用于显示）
  date: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '记录日期（格式：YYYY-MM-DD）'
  }
}, {
  tableName: 'records', // 表名，和你的 user 表保持风格
  timestamps: true // 自动生成 createdAt/updatedAt，方便排序
});

// ------------------------------
// 自动同步表结构！！！
// 这一句 = 自动建表
// ------------------------------
sequelize.sync()
  .then(() => console.log('✅ 数据库表自动创建完成！'))
  .catch(err => console.error('❌ 同步失败：', err));

export default sequelize;
export { User, Record };
