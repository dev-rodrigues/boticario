import { STATUS_CODES } from "http";
import AppError from "../../../shared/errors/AppError";
import IOrderRepository from "../repositories/IOrderRepository";

interface Request {
  order_id: number;
}

class DeleteOrderService {

  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {    
    this.orderRepository = orderRepository;
  }

  public async execute({ order_id }: Request): Promise<void> {

    const order = await this.orderRepository.findById(order_id);

    if (order === undefined) {
      throw new AppError("Order does not exist", 404);
    }

    const status_allowed = order.status === STATUS_CODES.ALLOWED;
    
    if (!status_allowed) {
      throw new AppError("Status does not permit delete", 400);
    }

    await this.orderRepository.delete(order);
  }
}

export default DeleteOrderService;