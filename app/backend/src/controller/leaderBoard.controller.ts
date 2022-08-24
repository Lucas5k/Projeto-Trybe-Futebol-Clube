import { Request, Response } from 'express';
import LeaderBoardService from '../service/leaderBoard.services';
import TeamService from '../service/team.services';

class LeaderBoardController {
  public getBoard = async (_req: Request, res: Response): Promise<void> => {
    const teams = await TeamService.getTeams();

    const result = await LeaderBoardService.getBoard(teams);
    res.status(200).json(result);
  };
}

export default LeaderBoardController;
