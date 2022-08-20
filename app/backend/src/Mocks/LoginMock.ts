import user from '../database/models/user';

const userMock = {
  id: 1,
  username: 'lucas',
  email: 'email@gmail.com',
  role: 'user',
  password: '123456',
} as unknown as user;

export default userMock;
