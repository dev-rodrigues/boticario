import { Router } from 'express';

import orders from './orders.routes';
import users from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/orders', orders);
routes.use('/users', users);
routes.use('/sessions', sessionsRouter);

export default routes;