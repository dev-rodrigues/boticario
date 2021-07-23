import { Router } from 'express';
import 'express-async-errors';
import CreateOrderService from '../../modules/orders/services/CreateOrderService';
import DeleteOrderService from '../../modules/orders/services/DeleteOrderService';
import FetchUserOrders from '../../modules/orders/services/FetchUserOrders';
import UpdateOrderService from '../../modules/orders/services/UpdateOrderService';

import ensureAuthenticated from '../infra/http/middlewares/EnsureAuthenticated';

const ordersRouter = Router();

ordersRouter.get('/', ensureAuthenticated, async (req, res) => {  
  const user_id = req.user.id;
  const fetchUserOrders = new FetchUserOrders();
  const response = await fetchUserOrders.execute({ user_id });
  return res.json(response);
});

ordersRouter.post('/', ensureAuthenticated, async (request, res) => {  
  const { code, price, date, cpf } = request.body;

  const createOrderService = new CreateOrderService();
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
  const order_id = parseInt(order_id_);

  const { code, price, date, cpf } = request.body;

  const updateOrderService = new UpdateOrderService();
  const updated = await updateOrderService.execute({
    order_id,
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

  const deleteOrderService = new DeleteOrderService();
  
  await deleteOrderService.execute({ order_id });

  response.status(204).json();
})

export default ordersRouter;
