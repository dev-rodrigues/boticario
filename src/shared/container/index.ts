import { container } from 'tsyringe';

import IOrderRepository from '../../modules/orders/repositories/IOrderRepository';
import OrderRepository from '../../modules/orders/infra/repositories/typeorm/repositories/OrderRepository';

import IUserRepository from '../../modules/users/repositories/IUserRepository';
import UserRepository from '../../modules/users/infra/repositories/typeorm/repositories/UserRepository';

container.registerSingleton<IOrderRepository>('OrderRepository', OrderRepository)
container.registerSingleton<IUserRepository>('UserRepository', UserRepository)