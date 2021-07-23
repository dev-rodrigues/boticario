import { STATUS_CODES } from "http";
import { getCustomRepository } from "typeorm";
import Order from "../../../domain/entities/Order";
import AppError from "../../../shared/errors/AppError";
import IOrderRepository from "../repositories/IOrderRepository";

interface Request {
  id: number;
  code: number; 
  price: number;
  date: Date;
  cpf: string;
}

class UpdateOrderService {

  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {    
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