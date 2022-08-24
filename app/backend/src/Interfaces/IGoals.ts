interface Goals {
  homePoints: number;
  awayPoints: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  homeTeam: string;
  awayTeam: string;
  goalsFavor?: number;
  goalsOwn?: number;
  goalsBalance?: number;
}

export default Goals;
