import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  // public <campo>!: <tipo>;
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

User.init({
  // ... Campos
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
