import { Request, Response } from 'express';
import MatchService from '../service/match.services';

class MatchController {
  public getMatch = async (_req: Request, res: Response): Promise<void> => {
    const result = await MatchService.getMatch();

    res.status(200).json(result);
  };
}

export default MatchController;
