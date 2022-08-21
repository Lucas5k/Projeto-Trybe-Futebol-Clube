interface Match {
  id?: number;
  homeTeam: number;
  homeTeamGoal: number;
  awayTea: number;
  awayTeamGoal: number;
  inProgres: boolean;
  teamHome: {
    teamName: string;
  },
  teamAway: {
    teamName: string;
  }
}

export default Match;
