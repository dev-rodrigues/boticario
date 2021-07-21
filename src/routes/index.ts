import { Router } from 'express';

import orders from './order.routes';

const routes = Router();

routes.use('/orders', orders);

export default routes;