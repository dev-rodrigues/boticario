import { EntityRepository, Repository } from 'typeorm';
import Order from '../../../domain/entities/Order';

@EntityRepository(Order)
class OrderRepository extends Repository<Order> {
}

export default OrderRepository;