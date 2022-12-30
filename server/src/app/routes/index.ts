import { Router } from 'express';
import loadRoutes from './loadRoutes';

const routes = Router();

export default routes;

loadRoutes();
