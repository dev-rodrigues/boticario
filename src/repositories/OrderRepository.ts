import { EntityRepository, Repository } from 'typeorm';
import Order from '../domain/entity/Order';

@EntityRepository(Order)
class OrderRepository extends Repository<Order> {
}

export default OrderRepository;