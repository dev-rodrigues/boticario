import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UserRepository from '../../../../users/infra/typeorm/repositories/UserRepository';
import CreateOrderService from '../../../services/CreateOrderService';
import DeleteOrderService from '../../../services/DeleteOrderService';
import FetchUserOrdersService from '../../../services/FetchUserOrdersService';
import UpdateOrderService from '../../../services/UpdateOrderService';
import OrderRepository from '../../repositories/typeorm/repositories/OrderRepository';

class OrdersControllers {

  public async index(request:Request , response:Response):Promise<Response> {
    const orderRepository = container.resolve(OrderRepository);
    const userRepository = container.resolve(UserRepository);

    const user_id = request.user.id;
    const fetchUserOrders = new FetchUserOrdersService(orderRepository, userRepository);
    const orders = await fetchUserOrders.execute({ user_id });
    return response.json(orders);
  }

  public async create(request:Request , response:Response):Promise<Response> {
    const { code, price, date, cpf } = request.body;

    const orderRepository = container.resolve(OrderRepository);
    
    const createOrderService = new CreateOrderService(orderRepository);
    const order = await createOrderService.execute({
      code,
      price,
      date,
      cpf
    });
    
    return response.json(order);
  }

  public async update(request:Request , response:Response):Promise<Response> {
    const order_id_: string = request.query.order_id as string;  
    const { code, price, date, cpf } = request.body;
  
    const repository = container.resolve(OrderRepository);    
    const updateOrderService = new UpdateOrderService(repository);
    const updated = await updateOrderService.execute({
      id: parseInt(order_id_),
      code, 
      price, 
      date, 
      cpf
    })
  
    return response.json(updated)
  }

  public async destroy(request:Request , response:Response):Promise<Response> {
    const order_id_: string = request.query.order_id as string;
    const order_id = parseInt(order_id_);

    const deleteOrderService = container.resolve(DeleteOrderService);
    
    await deleteOrderService.execute({ order_id });

    return response.status(204).json();
  }
}

export default OrdersControllers;