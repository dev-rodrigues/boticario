import { Router } from 'express';

import orders from './orders.routes';
import users from './users.routes';

const routes = Router();

routes.use('/orders', orders);
routes.use('/users', users);

export default routes;