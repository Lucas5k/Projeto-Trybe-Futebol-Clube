import * as chai from 'chai';
import * as Sinon from 'sinon';
import match from '../database/models/match';
import createMock from '../Mocks/MatchCreate';
// @ts-ignore import chaiHttp = require('chai-http');
import chaiHttp = require('chai-http');
import { app } from '../app';
import IMatch from '../Interfaces/IMatch';
import jwtService from '../service/jwtServices';
import { requestMock } from '../Mocks/MatchCreate';

chai.use(chaiHttp);

describe('#Match', () => {
  describe('findAll', () => {
    beforeEach(() => {
      Sinon.stub(match, 'findAll').resolves([createMock])
    });

    afterEach(() => {
      Sinon.restore();
    });

    it('se ao fazer a requisição se retorna os corretamente', async () => {
      const response = await chai.request(app).get('/matches');

      const [body] = response.body as IMatch[]

      chai.expect(response.status).to.equal(200);
      chai.expect(body.id).to.deep.equal(createMock.id);
      chai.expect(body.homeTeam).to.deep.equal(createMock.homeTeam);
      chai.expect(body.homeTeamGoals).to.deep.equal(createMock.homeTeamGoals);
      chai.expect(body.awayTeam).to.deep.equal(createMock.awayTeam);
      chai.expect(body.awayTeamGoals).to.deep.eq(createMock.awayTeamGoals);
      chai.expect(body.inProgress).to.be.eq(true)
    });
  });

  describe('#create', () => {
    beforeEach(() => {
      Sinon.stub(match, 'create').resolves(createMock);
      Sinon.stub(jwtService, 'verifyToken').returns('any-token');
    });

    afterEach(() => {
      Sinon.restore();
    });

    it('ao mandar no body da requisição dados corretos se retorna os dados corretos', async () => {
      const response = await chai.request(app).post('/matches').send(requestMock);

      const JWT = jwtService.verifyToken('anys-token');

      chai.expect(JWT).to.equal('any-token')
      chai.expect(response.status).to.eq(201);
      chai.expect(response.body).to.deep.eq(createMock);
    });
  });

  describe('#ValidCreate', () => {
    beforeEach(() => {
      Sinon.stub(match, 'findOne').resolves(createMock);
      Sinon.stub(jwtService, 'verifyToken').returns('any-token');
    });

    afterEach(() => {
      Sinon.restore();
    });

    it('ao mandar no body da requisição o homeTeam igual se da erro status 401', async () => {
      const response = await chai.request(app).post('/matches').send('awayTeam: 16');

      const JWT = jwtService.verifyToken('anys-token');

      chai.expect(JWT).to.equal('any-token')
      chai.expect(response.status).to.eq(401);
      chai.expect(response.body).to.deep.eq({ message: 'It is not possible to create a match with two equal teams' })
    });

    it('ao passar no body da requisição um homeTeam diferente e retorna um status 404', async () => {
      Sinon.stub(match, 'findOne').resolves(createMock.homeTeam as unknown as match);
      const test = 'homeTeam: 30';
      const response = await chai.request(app).post('/matches').send(test);

      const JWT = jwtService.verifyToken('anys-token');

      chai.expect(JWT).to.eq('any-token');
      chai.expect(response.status).to.eq(404);

    })
  });
});
