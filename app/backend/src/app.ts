import * as express from 'express';
import middlewareError from './middlewareError/middlewareError';
import routerLeader from './Routers/leaderBoard.Router';
import routerAdmin from './Routers/login.Admin.Router';
import routerLogin from './Routers/login.Router';
import routerMatch from './Routers/match.Router';
import routerTeam from './Routers/teams.Router';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/login', routerLogin);
    this.app.use('/login/validate', routerAdmin);
    this.app.use('/teams', routerTeam);
    this.app.use('/matches', routerMatch);
    this.app.use('/leaderboard/home', routerLeader);
    this.app.use(middlewareError);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
