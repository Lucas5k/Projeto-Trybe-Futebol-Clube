import bcrypt = require('bcryptjs');
import user from '../database/models/user';
import jwtService from './jwtServices';
import Login from '../Interfaces/ILogin';

class LoginService {
  public static createToken = async (USER: Login): Promise<string | boolean> => {
    const { email, password } = USER;
    const verify = await user.findOne({ where: { email } });
    if (!verify) return false;

    const test = await bcrypt.compare(password, verify.password);
    if (!test) return false;
    const token: string = jwtService.generateToken({ email, password });

    return token;
  };
}

export default LoginService;
