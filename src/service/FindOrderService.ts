import { getCustomRepository } from 'typeorm';
import Order from '../domain/entity/Order';
import OrderDTO from '../domain/objectsValues/OrderDTO';
import OrderRepository from '../repositories/OrderRepository';
import ProcessCashBack from './ProcessCashBack';

class FindOrderService {

  public async execute(): Promise<OrderDTO[]> {
    const orderRepository = getCustomRepository(OrderRepository);
    const processCashBack = new ProcessCashBack();

    const orders = await orderRepository.find();

    return processCashBack.execute(this.omitValues(orders));    
  }

  private omitValues(orders:Order[]):Order[] {
    var response = orders.map(function(it) {                  
      return  new Order(it.code, it.price, it.date, it.status)      
    })
    return response;
  }

}

export default FindOrderService;