import { Router } from 'express';
import LoginController from '../controller/login.controllers';

const routerLogin = Router();

const LOGINCONTROLLER = new LoginController();

routerLogin.post('/', LOGINCONTROLLER.create);

export default routerLogin;
