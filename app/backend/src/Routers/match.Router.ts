import { Router } from 'express';
import MatchController from '../controller/match.controller';

const routerMatch = Router();

const MATCHCONTROLLER = new MatchController();

routerMatch.get('/', MATCHCONTROLLER.getMatch);
routerMatch.post('/', MATCHCONTROLLER.postMatch);
routerMatch.patch('/:id/finish', MATCHCONTROLLER.finishMatch);
routerMatch.patch('/:id', MATCHCONTROLLER.updatedMatch);

export default routerMatch;
