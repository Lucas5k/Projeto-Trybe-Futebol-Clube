import { sign } from 'jsonwebtoken';
import Login from '../Interfaces/ILogin';

const jwtSecret = 'jwt_secret';

const generateToken = (user: Login) => {
  const token = sign({ user }, jwtSecret);

  return token;
};

export default generateToken;
