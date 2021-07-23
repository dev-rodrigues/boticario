import Order from '../../../domain/entities/Order';
import OrderDTO from '../../../shared/objectsValues/OrderDTO';
import FindUserService from '../../users/services/FindUserService';
import ProcessCashBack from './ProcessCashBack';

import IOrderRepository from "../repositories/IOrderRepository";

interface Request {
  user_id: string;
}

class FetchUserOrders {

  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {    
    this.orderRepository = orderRepository;
  }

  public async execute({user_id}: Request): Promise<OrderDTO[]> {
    const findUserService = new FindUserService();
    const processCashBack = new ProcessCashBack();

    const user = await findUserService.execute({
      user_id: parseInt(user_id) 
    })
    
    const orders = await this.orderRepository.findByCpf(user.cpf);

    return processCashBack.execute(this.omitValues(orders));    
  }

  private omitValues(orders:Order[] | undefined):Order[] {
    var response :Order[] = [];

    if (orders !== undefined) {
      orders.map(function(it) {                  
        response.push(new Order(it.code, it.price, it.date, it.status))
      })
    }
    
    return response;
  }

}

export default FetchUserOrders;