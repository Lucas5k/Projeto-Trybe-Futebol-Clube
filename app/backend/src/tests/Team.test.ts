import * as chai from 'chai';
import * as Sinon from 'sinon';
import team from '../database/models/team';
import teamMock from '../Mocks/TeamListMock';
// @ts-ignore import chaiHttp = require('chai-http');
import chaiHttp = require('chai-http');
import { app } from '../app';
import Iteams from '../Interfaces/ITeams';

chai.use(chaiHttp);

describe('#Team', () => {
  describe('List', () => {
    beforeEach(() => {
      Sinon.stub(team, 'findAll').resolves([ teamMock as team ]);
    });
    afterEach(() => {
      Sinon.restore();
    });

    it('ao fazer uma requisição do tipo get se retorna 200', async () => {
      const response = await chai.request(app).get('/teams');
      
      chai.expect(response.status).to.equal(200);
    });

    it('ao fazer uma requisição do tipo get se retorna um array de times', async () => {
      const response = await chai.request(app).get('/teams');
      
      const [teams] = response.body as Iteams[];
      
      chai.expect(teams.id).to.equal(teamMock.id);
      chai.expect(teams.teamName).to.equal(teamMock.teamName);
    });
  });

  describe('List', () => {
    beforeEach(() => {
      Sinon.stub(team, 'findByPk').resolves(teamMock as team);
    });
    afterEach(() => {
      Sinon.restore();
    });

    it('ao fazer uma requisição do tipo get se retorna 200', async () => {
      const response = await chai.request(app).get('/teams/:id').send('1');
      
      chai.expect(response.status).to.equal(200);
    });

    it('ao fazer uma requisição do tipo get se retorna um único time', async () => {
      const response = await chai.request(app).get('/teams/:id').send('1');
      
      const teams = response.body as Iteams;
      
      chai.expect(teams.id).to.equal(teamMock.id);
      chai.expect(teams.teamName).to.equal(teamMock.teamName);
    });
  });
});