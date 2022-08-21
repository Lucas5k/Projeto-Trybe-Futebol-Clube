import { Request, Response } from 'express';
import TeamService from '../service/team.services';

class TeamController {
  public getTeams = async (_req: Request, res: Response) => {
    const result = await TeamService.getTeams();

    res.status(200).json(result);
  };

  public findByTeam = async (req: Request, res: Response) => {
    console.log(Number(req.params.id));
    const result = await TeamService.findByTeam(Number(req.params.id));

    res.status(200).json(result);
  };
}

export default TeamController;
