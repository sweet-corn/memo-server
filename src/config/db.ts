import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

const DB_NAME = process.env.DB_NAME!;

// 先创建数据库（不存在就创建）
const initDB = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await connection.end();
};

initDB();

// 连接数据库
const sequelize = new Sequelize(
  DB_NAME,
  process.env.DB_USER!,
  process.env.DB_PWD!,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

export default sequelize;