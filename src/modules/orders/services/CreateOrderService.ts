import { getCustomRepository } from 'typeorm';
import Order from '../../../domain/entities/Order';

import IOrderRepository from '../repositories/IOrderRepository'
import OrderRepository from '../infra/typeorm/repositories/OrderRepository';
import ProcessStatusService from './ProcessStatusService';

interface Request {
  code: number;
  price: number;
  date: Date;
  cpf: string;
}

class CreateOrderService {

  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {    
    this.orderRepository = orderRepository;
  }

  public async execute({ code, price, date, cpf }:Request): Promise<Order> {    

    const status = new ProcessStatusService().execute({cpf})
        
    const order = this.orderRepository.create({
      code,
      price,
      date,
      cpf,
      status
    });

    return order;
  }
}

export default CreateOrderService;