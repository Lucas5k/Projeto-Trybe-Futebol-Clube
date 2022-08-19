import { Request, Response } from 'express';
import Login from '../Interfaces/ILogin';
import LoginService from '../service/login.services';

class UserController {
  public create = async (req: Request, res: Response): Promise<void> => {
    const token = await LoginService.createToken(req.body as Login);
    res.status(200).json({ token });
  };
}

export default UserController;
