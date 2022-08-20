import { Request, Response } from 'express';
import Login from '../Interfaces/ILogin';
import LoginService from '../service/login.services';

class UserController {
  public create = async (req: Request, res: Response) => {
    const isValid = await LoginService.valitedInfos(req.body as Login);

    if (isValid?.code) return res.status(isValid.code).json({ message: isValid.message });
    const token = await LoginService.createToken(req.body as Login);
    res.status(200).json({ token });
  };
}

export default UserController;
