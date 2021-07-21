import { getConnection, getCustomRepository } from 'typeorm';
import Order from '../entity/Order';
import OrderRepository from '../repositories/OrderRepository';

interface Request {
  codigo: number;
  valor: number;
  data: Date;
  cpf: string;
}

class CreateOrderService {

  public async execute({codigo, valor, data, cpf}:Request): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);

    const order = orderRepository.create({
      codigo,
      valor,
      data,
      cpf
    });
    
    await orderRepository.save(order);
    return order;
  }

}

export default CreateOrderService;