import { Router } from 'express';
import LeaderBoardController from '../controller/leaderBoard.controller';

const routerLeader = Router();

const LEADERBOARDCONTROLLER = new LeaderBoardController();

routerLeader.get('/', LEADERBOARDCONTROLLER.getBoard);

export default routerLeader;
