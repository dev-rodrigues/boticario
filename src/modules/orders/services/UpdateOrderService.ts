import { injectable, inject } from 'tsyringe';

import { STATUS_CODES } from "http";
import Order from "../../../domain/entities/Order";
import AppError from "../../../domain/errors/AppError";
import IOrderRepository from "../repositories/IOrderRepository";

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

  public async execute({ id, code, price, date, cpf }: Request): Promise<Order> {

    const order = await this.orderRepository.findById(id);

    if (order === undefined) {
      throw new AppError("Order does not exist", 404);
    }

    const status_allowed = order.status === STATUS_CODES.ALLOWED;
    
    if (!status_allowed) {
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