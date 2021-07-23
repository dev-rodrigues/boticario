import Order from '../../../../../../domain/entities/Order';
import ICreateOrderDTO from '../../../../dtos/ICreateOrderDTO';
import IUpdatedOrderDTO from '../../../../dtos/IUpdatedOrderDTO';
import IOrderRepository from '../../../../repositories/IOrderRepository';

class FakeOrderRepository implements IOrderRepository {
    private orders: Order[] = [];
  
  async create({code, cpf, date, price, status}: ICreateOrderDTO): Promise<Order|undefined> {
    const order = new Order(code, price, date, status);
    
    Object.assign(order, {id: Math.random, cpf })
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
    return undefined
  }

  public async delete(order: Order): Promise<void> {
    
  }

}

export default FakeOrderRepository;