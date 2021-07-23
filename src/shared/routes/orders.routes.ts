import { Router } from 'express';
import { container } from 'tsyringe';
import 'express-async-errors';


import DeleteOrderService from '../../modules/orders/services/DeleteOrderService';
import FetchUserOrdersService from '../../modules/orders/services/FetchUserOrdersService';
import UpdateOrderService from '../../modules/orders/services/UpdateOrderService';
import OrderRepository from '../../modules/orders/infra/typeorm/repositories/OrderRepository';

import ensureAuthenticated from '../infra/http/middlewares/EnsureAuthenticated';
import UserRepository from '../../modules/users/infra/typeorm/repositories/UserRepository';
import OrdersControllers from '../../modules/orders/infra/http/controllers/OrdersControllers';

const ordersRouter = Router();
const ordersControllers = new OrdersControllers();

ordersRouter.get('/', ensureAuthenticated, ordersControllers.list);

ordersRouter.post('/', ensureAuthenticated, ordersControllers.create);

ordersRouter.put('/', ordersControllers.update);

ordersRouter.delete('/', ordersControllers.destroy)

export default ordersRouter;
