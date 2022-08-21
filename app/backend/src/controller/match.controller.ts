import { Request, Response } from 'express';
import MatchService from '../service/match.services';
import JwtService from '../service/jwtServices';

class MatchController {
  public getMatch = async (_req: Request, res: Response): Promise<void> => {
    const result = await MatchService.getMatch();

    res.status(200).json(result);
  };

  public postMatch = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const validated = await MatchService.ValidatedMatches(req.body);

    const verify = JwtService.verifyToken(String(token));

    if (verify === false) return res.status(401).json({ message: 'Token must be a valid token' });
    if (validated?.code) {
      return res.status(validated.code).json({ message: validated.message });
    }
    const result = await MatchService.postMatch(req.body);

    res.status(201).json(result);
  };

  public finishMatch = async (req: Request, res: Response): Promise<void> => {
    await MatchService.finishMatch(Number(req.params.id));

    res.status(200).json({ message: 'Finished' });
  };

  public updatedMatch = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await MatchService.updatedMatch(Number(id), req.body);

    res.status(200).json({ message: 'Deu Certo!' });
  };
}

export default MatchController;
