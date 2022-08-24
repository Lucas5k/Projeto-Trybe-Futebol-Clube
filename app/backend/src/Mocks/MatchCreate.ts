import match from '../database/models/match';

const createMock = {
  id: 49,
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoals: 2,
  inProgress: true,
} as unknown as match;

const requestMock = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export default createMock;
export { requestMock };
