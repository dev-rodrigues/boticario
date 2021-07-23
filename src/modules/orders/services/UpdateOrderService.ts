import { STATUS_CODES } from "http";
import { getCustomRepository } from "typeorm";
import Order from "../../../domain/entities/Order";
import AppError from "../../../shared/errors/AppError";
import OrderRepository from "../repositories/OrderRepository";

interface Request {
  order_id: number;
  code: number; 
  price: number;
  date: Date;
  cpf: string;
}

class UpdateOrderService {

  public async execute({ order_id, code, price, date, cpf }: Request): Promise<Order> {

    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository.findOne({
      where: {
        id: order_id
      }
    });

    if (order === undefined) {
      throw new AppError("Order does not exist", 404);
    }

    const status_allowed = order.status === STATUS_CODES.ALLOWED;
    
    if (!status_allowed) {
      throw new AppError("Status does not permit update", 400);
    }

    const order_updated = await orderRepository.save({
      id: order_id,
      code,
      price,
      date,
      cpf
    });
    
    return order_updated;
  }
}

export default UpdateOrderService;