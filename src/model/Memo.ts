import { DataTypes } from 'sequelize';
import db from '../config/db';

const Memo = db.define('Memo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT
  },
  isTop: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export default Memo;