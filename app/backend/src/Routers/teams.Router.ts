import { Router } from 'express';
import TeamController from '../controller/team.controller';

const routerTeam = Router();

const TEAMCONTROLLER = new TeamController();

routerTeam.get('/', TEAMCONTROLLER.getTeams);
routerTeam.get('/:id', TEAMCONTROLLER.findByTeam);

export default routerTeam;
