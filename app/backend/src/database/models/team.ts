import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  // public <campo>!: <tipo>;
  id!: number;
  teamName!: string;
}

Team.init({
  // ... Campos
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    field: 'team_name',
    allowNull: false,
    type: STRING,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Team;
