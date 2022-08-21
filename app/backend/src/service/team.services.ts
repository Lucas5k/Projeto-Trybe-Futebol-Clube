import team from '../database/models/team';
import Iteams from '../Interfaces/ITeams';

class TeamService {
  public static getTeams = async (): Promise<Iteams[]> => {
    const findAll = await team.findAll();

    return findAll;
  };

  public static findByTeam = async (id: number): Promise<Iteams | boolean> => {
    const findByPK = await team.findByPk(id);
    if (!findByPK) return false;

    return findByPK;
  };
}

export default TeamService;
