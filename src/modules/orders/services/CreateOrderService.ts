import Order from '../../../domain/entities/Order';
import { injectable, inject } from 'tsyringe';

import IOrderRepository from '../repositories/IOrderRepository'
import ProcessStatusService from './ProcessStatusService';

interface Request {
  code: number;
  price: number;
  date: Date;
  cpf: string;
}

@injectable()
class CreateOrderService {

  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository) {    
    this.orderRepository = orderRepository;
  }

  public async execute({ code, price, date, cpf }: Request): Promise<Order> {    

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