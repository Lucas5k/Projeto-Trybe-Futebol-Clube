import bcrypt = require('bcryptjs');
import user from '../database/models/user';
import jwtService from './jwtServices';
import Login from '../Interfaces/ILogin';

class LoginService {
  public static createToken = async (USER: Login): Promise<string | boolean> => {
    const { email, password } = USER;
    const verify = await user.findOne({ where: { email, password } });
    if (!verify) return false;

    await bcrypt.compare('B4c0//', String(verify?.password));
    const token: string = jwtService(verify);

    return token;
  };
}

export default LoginService;
