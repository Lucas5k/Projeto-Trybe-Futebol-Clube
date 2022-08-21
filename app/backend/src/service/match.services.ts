import IMatch from '../Interfaces/IMatch';
import IReturnMatch from '../Interfaces/IReturnMatch';
import match from '../database/models/match';
import team from '../database/models/team';
import ICreateMatch from '../Interfaces/ICreateMatch';

class MatchService {
  public static ValidatedMatches = async (data: ICreateMatch) => {
    const { homeTeam, awayTeam } = data;
    const verifyHomeTeam = await match.findOne({ where: { homeTeam } });
    const verifyAwayTeam = await match.findOne({ where: { awayTeam } });

    if (homeTeam === awayTeam) {
      return { code: 401, message: 'It is not possible to create a match with two equal teams' };
    }
    if (!verifyHomeTeam || !verifyAwayTeam) {
      return { code: 404, message: 'There is no team with such id!' };
    }
  };

  public static getMatch = async (): Promise<IMatch[]> => {
    const findALL = await match.findAll({
      include: [{
        model: team, as: 'teamHome', attributes: ['teamName'],
      }, {
        model: team, as: 'teamAway', attributes: ['teamName'],
      }],
    });

    return findALL as unknown as IMatch[];
  };

  public static postMatch = async (createMatch: ICreateMatch): Promise<IReturnMatch> => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = createMatch;

    const create = await match.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    });

    return create;
  };

  public static finishMatch = async (id: number): Promise<void> => {
    await match.update({
      inProgress: false,
    }, { where: { id } });
  };
}

export default MatchService;
