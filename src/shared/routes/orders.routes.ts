import { Router } from 'express';
import 'express-async-errors';

import ensureAuthenticated from '../infra/http/middlewares/EnsureAuthenticated';
import OrdersControllers from '../../modules/orders/infra/http/controllers/OrdersControllers';

const ordersRouter = Router();
const ordersControllers = new OrdersControllers();

ordersRouter.get('/', ensureAuthenticated, ordersControllers.index);

ordersRouter.post('/', ensureAuthenticated, ordersControllers.create);

ordersRouter.put('/', ordersControllers.update);

ordersRouter.delete('/', ordersControllers.destroy)

export default ordersRouter;
