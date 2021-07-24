import Order from '../../../../../../domain/entities/Order';
import AppError from '../../../../../../domain/errors/AppError';
import ICreateOrderDTO from '../../../../dtos/ICreateOrderDTO';
import IUpdatedOrderDTO from '../../../../dtos/IUpdatedOrderDTO';
import IOrderRepository from '../../../../repositories/IOrderRepository';

class FakeOrderRepository implements IOrderRepository {
    private orders: Order[] = [];
  
  async create({code, cpf, date, price, status}: ICreateOrderDTO): Promise<Order|undefined> {
    const order = new Order(code, price, date, status);
    
    Object.assign(order, {id: 1, cpf })
    this.orders.push(order);
    
    return order;
  }
  
  public async findById(id: number): Promise<Order|undefined> {
    const findOrder = this.orders.find(it => it.id === id);

    return findOrder;
  }

  public async findByCpf(cpf: string): Promise<Order[]|undefined> {
    const located: Order[] = [];

    this.orders.forEach(it => {
      if (it.cpf === cpf) {
        located.push(it);
      }
    });

    return located;
  }

  public async update({ id, code, cpf, date, price, status }: IUpdatedOrderDTO): Promise<Order | undefined> {

    const order = this.orders.find(it => it.id === id);

    if (order) {
      order.id = id;
      order.code = code;
      order.cpf = cpf;
      order.date = date;
      order.price = price;
      order.status = status;
    }

    return order
  }

  public async delete(order: Order): Promise<boolean> {
    
    try {      
      this.orders.filter(it => it.id === order.id);      
      return true;
    } catch {
      throw new AppError("does not possibile execute delete", 404)
    }    
  }

}

export default FakeOrderRepository;