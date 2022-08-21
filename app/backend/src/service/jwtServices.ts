import { sign, verify } from 'jsonwebtoken';
import Login from '../Interfaces/ILogin';

class JwtService {
  static generateToken(payload: Login): string {
    return sign(payload, String(process.env.JWT_SECRET));
  }

  static verifyToken(token: string) {
    try {
      const data = verify(token, String(process.env.JWT_SECRET));

      return data;
    } catch (e) {
      if (e) {
        return false;
      }
    }
  }
}
// const generateToken = (user: Login) => {
//   const token = sign({ user }, jwtSecret);

//   return token;
// };

export default JwtService;
