import { getCustomRepository } from "typeorm";
import AppError from "../domain/errors/AppError";
import OrderRepository from "../repositories/OrderRepository";
import STATUS from '../domain/objectsValues/StatusAllowd';

interface Request {
  order_id: number;
}

class DeleteOrderService {

  public async execute({ order_id }: Request): Promise<void> {

    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository.findOne({
      where: {
        id: order_id
      }
    });

    if (order === undefined) {
      throw new AppError("Order does not exist", 404);
    }

    const status_allowed = order.status === STATUS.ALLOWED;
    
    if (!status_allowed) {
      throw new AppError("Status does not permit delete", 400);
    }

    await orderRepository.delete(order);

  }
}

export default DeleteOrderService;