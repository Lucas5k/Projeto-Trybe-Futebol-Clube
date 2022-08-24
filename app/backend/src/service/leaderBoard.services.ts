// import IPointsSorted from '../Interfaces/IPointsSorted';
import match from '../database/models/match';
import team from '../database/models/team';
import Iteams from '../Interfaces/ITeams';
import IMatch from '../Interfaces/IMatch';
import IPointsMatch from '../Interfaces/IPointsMatch';
import ITotalGames from '../Interfaces/ITotalGames';
import IGoals from '../Interfaces/IGoals';
import LeaderBoard from '../Interfaces/ILeaderBoard';

class LeaderBoardService {
  public static getBoard = async (teams: Iteams[]) => {
    const allTeams = teams.map(({ teamName }) => teamName);

    const resultsMatch = await match.findAll({
      include: [{
        model: team, as: 'teamHome', attributes: ['teamName'],
      }, {
        model: team, as: 'teamAway', attributes: ['teamName'],
      }],
      where: { inProgress: 'false' },
    });

    const test = LeaderBoardService.verifyMatch(resultsMatch as unknown as IMatch[]);

    const test1 = LeaderBoardService.funcIntermediary(allTeams, test);

    const test2 = LeaderBoardService.resultSort(test1);
    return test2;
  };

  public static verifyMatch = (results: IMatch[]) => {
    const result = results.map((r) => {
      const { homeTeamGoals, awayTeamGoals } = r;
      const sumGoals = homeTeamGoals - awayTeamGoals;
      let homePoints = 0;
      let awayPoints = 0;
      if (sumGoals === 0) homePoints = 1;
      if (sumGoals === 0) awayPoints = 1;
      if (sumGoals > 0) homePoints = 3;
      if (sumGoals < 0) awayPoints = 3;
      const data = { homeTeamGoals, homePoints, awayTeamGoals, awayPoints };

      return {
        homeTeam: r.teamHome.teamName,
        awayTeam: r.teamAway.teamName,
        ...data,
      };
    });
    return result;
  };

  public static funcIntermediary = (teams: string[], results: IPointsMatch[]) => {
    const result = teams.map((name) => {
      const totalPoints = LeaderBoardService.sumPoints(name, results);
      const totalGames = LeaderBoardService.sumGames(name, results);
      const totalGoals = LeaderBoardService.sumGoals(name, results);
      const allResults = {
        name,
        totalPoints,
        ...totalGames,
        ...totalGoals,
        efficiency: ((100 * totalPoints) / (totalGames.totalGames * 3)).toFixed(2),
      };
      return allResults;
    });
    return result;
  };

  public static sumPoints = (teams: string, results: IPointsMatch[]) => {
    const result = results.reduce((acc, curr) => {
      if (curr.homeTeam === teams) {
        return acc + curr.homePoints;
      }
      return acc;
    }, 0);
    return result;
  };

  public static sumGames = (teams: string, results: ITotalGames[]) => {
    const test = results.reduce((acc, curr) => {
      if (curr.homeTeam === teams) {
        const totalGames = acc.totalGames + 1;
        let { totalDraws } = acc;
        let { totalLosses } = acc;
        let { totalVictories } = acc;
        if (curr.homePoints === 1) totalDraws = acc.totalDraws + 1;
        if (curr.homePoints === 3) totalVictories = acc.totalVictories + 1;
        if (curr.homePoints === 0) totalLosses = acc.totalLosses + 1;
        return { totalGames,
          totalVictories,
          totalDraws,
          totalLosses };
      }
      return acc;
    }, { totalGames: 0, totalDraws: 0, totalLosses: 0, totalVictories: 0 });

    return test;
  };

  public static sumGoals = (teams: string, results: IGoals[]) => {
    const home = 'home';
    const result = results.reduce((acc, curr) => {
      if (curr.homeTeam === teams) {
        const test = home === 'home' ? 'away' : 'home';
        const own = acc.goalsOwn + curr[`${test}TeamGoals`];
        const favor = acc.goalsFavor + curr.homeTeamGoals;
        return { goalsFavor: favor, goalsOwn: own, goalsBalance: favor - own };
      }
      return acc;
    }, { goalsBalance: 0, goalsFavor: 0, goalsOwn: 0 });
    return result;
  };

  public static resultSort = (results: LeaderBoard[]) => {
    const sorted = (h: LeaderBoard, a: LeaderBoard) => {
      if (h.totalPoints > a.totalPoints) return -1;
      if (h.totalPoints < a.totalPoints) return 1;
      if (h.totalVictories > a.totalVictories) return -1;
      if (h.totalVictories < a.totalVictories) return 1;
      if (h.goalsBalance > a.goalsBalance) return -1;
      if (h.goalsBalance < a.goalsBalance) return 1;
      if (h.goalsFavor > a.goalsFavor) return -1;
      if (h.goalsFavor < a.goalsFavor) return 1;
      return 0;
    };

    return results.sort(sorted);
  };
}

export default LeaderBoardService;
