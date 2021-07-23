import { Router } from 'express';
import 'express-async-errors';

import CreateOrderService from '../../modules/orders/services/CreateOrderService';
import DeleteOrderService from '../../modules/orders/services/DeleteOrderService';
import FetchUserOrders from '../../modules/orders/services/FetchUserOrders';
import UpdateOrderService from '../../modules/orders/services/UpdateOrderService';
import OrderRepository from '../../modules/orders/infra/typeorm/repositories/OrderRepository';

import ensureAuthenticated from '../infra/http/middlewares/EnsureAuthenticated';

const ordersRouter = Router();
const orderRepository = new OrderRepository();

ordersRouter.get('/', ensureAuthenticated, async (req, res) => {  
  const user_id = req.user.id;
  const fetchUserOrders = new FetchUserOrders(orderRepository);
  const response = await fetchUserOrders.execute({ user_id });
  return res.json(response);
});

ordersRouter.post('/', ensureAuthenticated, async (request, res) => {  
  const { code, price, date, cpf } = request.body;

  const createOrderService = new CreateOrderService(orderRepository);
  const order = await createOrderService.execute({
    code,
    price,
    date,
    cpf
  });
  
  return res.json(order);
});

ordersRouter.put('/', async (request, response) => {
  const order_id_: string = request.query.order_id as string;  
  const { code, price, date, cpf } = request.body;

  const updateOrderService = new UpdateOrderService(orderRepository);
  const updated = await updateOrderService.execute({
    id: parseInt(order_id_),
    code, 
    price, 
    date, 
    cpf
  })

  response.json(updated)
});

ordersRouter.delete('/', async (request, response) => {
  const order_id_: string = request.query.order_id as string;
  const order_id = parseInt(order_id_);

  const deleteOrderService = new DeleteOrderService(orderRepository);
  
  await deleteOrderService.execute({ order_id });

  response.status(204).json();
})

export default ordersRouter;
