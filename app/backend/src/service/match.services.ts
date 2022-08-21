import IMatch from '../Interfaces/IMatch';
import match from '../database/models/match';
import team from '../database/models/team';

class MatchService {
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
}

export default MatchService;
