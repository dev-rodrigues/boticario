import { injectable, inject } from 'tsyringe';

import AppError from "../../../domain/errors/AppError";
import StatusAllowd from '../../../shared/objectsValues/StatusAllowd';
import IOrderRepository from "../repositories/IOrderRepository";


interface Request {
  order_id: number;
}

@injectable()
class DeleteOrderService {

  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository) {    
    this.orderRepository = orderRepository;
  }

  public async execute({ order_id }: Request): Promise<boolean> {

    const order = await this.orderRepository.findById(order_id);
            
    if (order === undefined) {      
      throw new AppError("Order does not exist", 404);
    }

    const isApproved = order.status === StatusAllowd.APPROVED;
        
    if (isApproved) {
      throw new AppError("Status does not permit delete", 400);
    }

    
    return await this.orderRepository.delete(order);
  }
}

export default DeleteOrderService;