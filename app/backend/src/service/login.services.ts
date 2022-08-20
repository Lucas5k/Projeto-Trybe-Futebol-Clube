import bcrypt = require('bcryptjs');
import user from '../database/models/user';
import jwtService from './jwtServices';
import Login from '../Interfaces/ILogin';

class LoginService {
  public static valitedInfos = async (Valited: Login) => {
    const { email, password } = Valited;
    const verifyInfos = await user.findOne({ where: { email } });

    if (!email || !password) return { code: 400, message: 'All fields must be filled' };
    if (!verifyInfos || !verifyInfos.password) {
      return { code: 401, message: 'Incorrect email or password' };
    }
  };

  public static createToken = async (USER: Login): Promise<string | boolean> => {
    const { email, password } = USER;
    const verify = await user.findOne({ where: { email } });
    if (!verify) return false;

    const verifyPass = await bcrypt.compare(password, verify.password);
    if (!verifyPass) return false;
    const token: string = jwtService.generateToken({ email, password });

    return token;
  };
}

export default LoginService;
