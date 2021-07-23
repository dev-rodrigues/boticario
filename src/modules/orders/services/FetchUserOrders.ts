import { getCustomRepository } from 'typeorm';
import Order from '../../../domain/entities/Order';
import OrderDTO from '../../../shared/objectsValues/OrderDTO';
import FindUserService from '../../users/services/FindUserService';
import OrderRepository from '../repositories/OrderRepository';
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