import { response, Router } from 'express';
import CreateOrderService from '../service/CreateOrderService';

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
  }catch(err) {
    return res.status(400).json({error: err.message})
  }
});

export default ordersRouter;