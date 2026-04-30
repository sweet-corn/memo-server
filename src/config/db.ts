import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

const DB_NAME = process.env.DB_NAME!;

// 数据库配置 railway
const DB_CONFIG = {
  PGDATA: "/var/lib/postgresql/data/pgdata",
  PGDATABASE: "railway",//对应DB_NAME
  PGHOST: "postgres.railway.internal",//DB_HOST
  PGPASSWORD:"IGUagfTnyYNHTqMZdzkfxFSPfjmsitXz",//DB_PWD
  PGPORT:5432,//DB_PORT
  PGUSER:"postgres",//DB_USER
};

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