import { response, Router } from 'express';
import CreateOrderService from '../service/CreateOrderService';

const ordersRouter = Router();

ordersRouter.get('/', async(req, res) => {
  res.json({
    banana: 'bananada'
  })
})

ordersRouter.post('/', async (req, res) => {
  try {
    const { codigo, valor, data, cpf } = req.body;
    console.log(codigo, valor, data)

    const createOrderService = new CreateOrderService();
    const order = await createOrderService.execute({
      codigo,
      valor,
      data,
      cpf
    });
    
    return res.json(order);
  }catch(err) {
    return res.status(400).json({error: err.message})
  }
});

export default ordersRouter;