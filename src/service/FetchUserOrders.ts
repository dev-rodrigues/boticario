import { getCustomRepository } from 'typeorm';
import Order from '../domain/entity/Order';
import User from '../domain/entity/User';
import OrderDTO from '../domain/objectsValues/OrderDTO';
import OrderRepository from '../repositories/OrderRepository';
import FindUserService from './FindUserService';
import ProcessCashBack from './ProcessCashBack';

interface Request {
  user_id: string;
}

class FetchUserOrders {

  public async execute({user_id}: Request): Promise<OrderDTO[]> {
    const orderRepository = getCustomRepository(OrderRepository);
    const findUserService = new FindUserService();
    const processCashBack = new ProcessCashBack();

    const user = await findUserService.execute({user_id: parseInt(user_id) })
    console.log(`USUARIO LOCALIZADO ${user.cpf}`);
    
    const orders = await orderRepository.find({
      where: {
        cpf: user.cpf
      }
    });

    return processCashBack.execute(this.omitValues(orders));    
  }

  private omitValues(orders:Order[]):Order[] {
    var response = orders.map(function(it) {                  
      return  new Order(it.code, it.price, it.date, it.status)      
    })
    return response;
  }

}

export default FetchUserOrders;