import { Request, Response } from 'express';
import AdminService from '../service/login.admin.services';

class AdminController {
  public getAdmin = async (req: Request, res: Response) => {
    const token: string | undefined = req.headers.authorization;

    if (!token) return res.status(400).json({ message: 'Token not found' });
    const result = await AdminService.getAdmin();

    res.status(200).json(result);
  };
}

export default AdminController;
