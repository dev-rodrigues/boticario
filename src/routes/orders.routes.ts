import { Router } from 'express';
import CreateOrderService from '../service/CreateOrderService';
import FindOrderService from '../service/FindOrderService';

const ordersRouter = Router();

ordersRouter.post('/', async (req, res) => {
  try {
    const { code, price, date, cpf } = req.body;
  
    const createOrderService = new CreateOrderService();    
    const order = await createOrderService.execute({
      code,
      price,
      date,
      cpf
    });
    
    return res.json(order);
  } catch(err) {
    return res.status(400).json({error: err.message})
  }
});

ordersRouter.get('/', async (req, res) => {
  const findOrderService = new FindOrderService();
  const response = await findOrderService.execute();
  return res.json(response);
});


export default ordersRouter;