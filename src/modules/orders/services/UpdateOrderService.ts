import { injectable, inject } from 'tsyringe';

import Order from "../../../domain/entities/Order";
import AppError from "../../../domain/errors/AppError";
import IOrderRepository from "../repositories/IOrderRepository";
import StatusAllowd from '../../../shared/objectsValues/StatusAllowd';

interface Request {
  id: number;
  code: number; 
  price: number;
  date: Date;
  cpf: string;
}

@injectable()
class UpdateOrderService {

  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository) {    
    this.orderRepository = orderRepository;
  }

  public async execute({ id, code, price, date, cpf }: Request): Promise<Order|undefined> {

    const order = await this.orderRepository.findById(id);

    if (order === undefined) {
      throw new AppError("Order does not exist", 404);
    }

    const approved = order.status === StatusAllowd.APPROVED;    
    if (approved) {
      throw new AppError("Status does not permit update", 400);
    }

    const status = order.status;
    const order_updated = await this.orderRepository.update({
      id, 
      code, 
      cpf, 
      price, 
      date, 
      status
    });
    
    return order_updated;
  }
}

export default UpdateOrderService;