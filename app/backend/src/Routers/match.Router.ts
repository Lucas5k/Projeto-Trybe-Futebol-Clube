import { Router } from 'express';
import MatchController from '../controller/match.controller';

const routerMatch = Router();

const MATCHCONTROLLER = new MatchController();

routerMatch.get('/', MATCHCONTROLLER.getMatch);

export default routerMatch;
