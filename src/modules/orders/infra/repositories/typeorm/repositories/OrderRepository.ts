import { getRepository, Repository } from 'typeorm';
import Order from '../../../../../../domain/entities/Order';
import AppError from '../../../../../../domain/errors/AppError';
import ICreateOrderDTO from '../../../../dtos/ICreateOrderDTO';
import IUpdatedOrderDTO from '../../../../dtos/IUpdatedOrderDTO';
import IOrderRepository from '../../../../repositories/IOrderRepository';

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

  public async create({ code, cpf, date, price, status }: ICreateOrderDTO): Promise<Order|undefined> {
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

  public async delete(order: Order): Promise<boolean> {
    try {
      await this.ormRepository.delete(order);
      return true;
    } catch {
      throw new AppError("Id does not exist", 404)
    }    
  }

}

export default OrderRepository;