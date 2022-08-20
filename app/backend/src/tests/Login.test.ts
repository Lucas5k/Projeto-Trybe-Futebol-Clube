import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as Sinon from 'sinon';
import user from '../database/models/user';
import jwtServices from '../service/jwtServices';
import userMock from '../Mocks/LoginMock';
// @ts-ignore import chaiHttp = require('chai-http');
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

describe('#Login', () => {
  describe('FindOne And JWT', () => {
    beforeEach(() => {
      Sinon.stub(user, 'findOne').resolves(userMock)
      Sinon.stub(jwtServices, 'generateToken').returns('any-token');
      Sinon.stub(bcrypt, 'compare').resolves(true)
    });
    afterEach(() => {
      Sinon.restore();
    });

    it('ao passar um email e password existentes ele retorna um token', async () => {
      const { email, password } = userMock;
      const response = await chai.request(app).post('/login').send({ email, password });

      const comparation = await bcrypt.compare(password, 'true');

      const JWT = jwtServices.generateToken({ email, password });

      chai.expect(comparation).to.be.true;
      chai.expect(JWT).to.equal('any-token')
      chai.expect(response.status).to.eq(200);
    });

    it('verifica se não informar o email se retorna o erro e o code', async () => {
      const { password } = userMock;
      const response =  await chai.request(app).post('/login').send(password);

      chai.expect(response.status).to.equal(400);
      chai.expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('verifica se não informar a password se retorna o erro e o code', async () => {
      const { email } = userMock;
      const response =  await chai.request(app).post('/login').send(email);

      chai.expect(response.status).to.equal(400);
      chai.expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    // it('verifica ao passar um email errado se retorna a message e code de error', async () => {
    //   const { email, password } = userMock;
    //   const fakeEmail = 'emal@gmail.com';
    //   const response = await chai.request(app).post('/login').send({ fakeEmail, password });
    //   chai.expect(response.body).to.deep.equal({ message: 'Incorrect email or password' });
    // });
  })
})