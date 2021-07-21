import { getConnection, getCustomRepository } from 'typeorm';
import Order from '../entity/Order';
import OrderRepository from '../repositories/OrderRepository';
interface Request {
  code: number;
  price: number;
  date: Date;
  cpf: string;
}

class CreateOrderService {

  public async execute({code, price, date, cpf}:Request): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);

    const order = orderRepository.create({
      code,
      price,
      date,
      cpf
    });
    
    await orderRepository.save(order);
    return order;
  }

}

export default CreateOrderService;