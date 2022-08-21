import user from '../database/models/user';

class AdminService {
  public static getAdmin = async () => {
    const result = await user.findOne({ where: { role: 'Admin' } });
    return result;
  };
}

export default AdminService;
