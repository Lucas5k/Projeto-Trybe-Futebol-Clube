import { Router } from 'express';
import AdminController from '../controller/login.admin.controller';

const routerAdmin = Router();

const ADMINCONTROLLER = new AdminController();

routerAdmin.get('/', ADMINCONTROLLER.getAdmin);

export default routerAdmin;
