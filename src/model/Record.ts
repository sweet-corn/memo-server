import { DataTypes } from 'sequelize';
import db from '../config/db';

// 表名：Record  对应数据库表：Records
const Record = db.define('Record', {
  // 类型：daily 日常 / weight 体重
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // 内容：文字 或 数字
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  // 微信昵称
  nickname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // 日期
  date: {
    type: DataTypes.STRING
  }
});

export default Record;
