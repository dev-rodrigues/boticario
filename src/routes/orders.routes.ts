import { Router } from 'express';
import 'express-async-errors';

import CreateOrderService from '../service/CreateOrderService';
import FindOrderService from '../service/FindOrderService';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

const ordersRouter = Router();
ordersRouter.use(ensureAuthenticated)

ordersRouter.post('/', async (request, res) => {  
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

ordersRouter.get('/', async (req, res) => {  
  const user_id = req.user.id;
  const findOrderService = new FindOrderService();
  const response = await findOrderService.execute({ user_id });
  return res.json(response);
});


export default ordersRouter;