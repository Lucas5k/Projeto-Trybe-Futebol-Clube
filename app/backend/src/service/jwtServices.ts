import { sign } from 'jsonwebtoken';
import Login from '../Interfaces/ILogin';

class JwtService {
  static generateToken(payload: Login): string {
    return sign(payload, String(process.env.JWT_SECRET));
  }
}
// const generateToken = (user: Login) => {
//   const token = sign({ user }, jwtSecret);

//   return token;
// };

export default JwtService;
