import { getCustomRepository } from 'typeorm';
import Order from '../../../domain/entities/Order';

import OrderRepository from '../repositories/OrderRepository';
import ProcessStatusService from './ProcessStatusService';

interface Request {
  code: number;
  price: number;
  date: Date;
  cpf: string;
}

class CreateOrderService {

  public async execute({ code, price, date, cpf }:Request): Promise<Order> {    
    const orderRepository = getCustomRepository(OrderRepository);

    const status = new ProcessStatusService().execute({cpf})
        
    const order = orderRepository.create({
      code,
      price,
      date,
      cpf,
      status
    });

    await orderRepository.save(order);
    return order;
  }
}

export default CreateOrderService;