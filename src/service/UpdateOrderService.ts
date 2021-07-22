import { getCustomRepository } from "typeorm";
import AppError from "../domain/errors/AppError";
import OrderRepository from "../repositories/OrderRepository";

interface Request {
  order_id: number;
  code: number; 
  price: number;
  date: Date;
  cpf: string;
}

class UpdateOrderService {

  private STATUS_ALLOWED : string = 'Em validação';

  public async execute({ order_id, code, price, date, cpf }: Request): Promise<void> {

    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository.findOne({
      where: {
        id: order_id
      }
    });

    if (order === undefined) {
      throw new AppError("Order does not exist", 404);
    }

    const status_allowed = order.status === this.STATUS_ALLOWED;
    
    if (!status_allowed) {
      throw new AppError("Status does not permit update", 400);
    }

    orderRepository.save({
      id: order_id,
      code,
      price,
      date,
      cpf
    });
    
    // if (orders.length === 0) {
    //   throw new AppError("Order does not exist", 404);
    // }

  }
}

export default UpdateOrderService;