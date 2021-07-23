import { getRepository, Repository } from 'typeorm';
import Order from '../../../../../domain/entities/Order';
import ICreateOrderDTO from '../../../dtos/ICreateOrderDTO';
import IUpdatedOrderDTO from '../../../dtos/IUpdatedOrderDTO';
import IOrderRepository from '../../../repositories/IOrderRepository';

class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }
  
  public async findById(id: number): Promise<Order | undefined> {
    return await this.ormRepository.findOne(id);
  }

  public async findByCpf(cpf: string): Promise<Order[] | undefined> {
    const order = await this.ormRepository.find({
      where: {
        cpf
      }
    });
    return order;
  }

  public async create({ code, cpf, date, price, status }: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create( {
      code,
      cpf,
      date,
      price,
      status,
    })

    await this.ormRepository.save(order);    
    return order;
  }

  public async update({ id, code, cpf, date, price, status }: IUpdatedOrderDTO): Promise<Order> {
    const updated = await this.ormRepository.save({
      id,
      code,
      cpf,
      date,
      price,
      status
    }); 
    return updated;
  }

  public async delete(order: Order): Promise<void> {
    await this.ormRepository.delete(order);
  }

}

export default OrderRepository;