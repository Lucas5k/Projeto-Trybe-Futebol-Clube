interface TotalGames {
  homePoints: number;
  awayPoints: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  homeTeam: string;
  awayTeam: string;
  totalVictories?: number;
  totalDraws?: number;
  totalLosses?: number;
}

export default TotalGames;
