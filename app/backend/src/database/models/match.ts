import { Model, INTEGER } from 'sequelize';
import db from '.';
import Team from './team';

class Match extends Model {
  // public <campo>!: <tipo>;
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

Match.init({
  // ... Campos
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    field: 'home_team',
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    field: 'home_team_goals',
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    field: 'away_team',
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    field: 'away_team_goals',
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    field: 'in_progress',
    allowNull: false,
    type: INTEGER,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Matches',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'id', as: 'Matches' });
Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
