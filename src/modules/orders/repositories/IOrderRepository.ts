import Order from "../../../domain/entities/Order";
import ICreateOrderDTO from "../dtos/ICreateOrderDTO";
import IUpdatedOrderDTO from "../dtos/IUpdatedOrderDTO";

export default interface IOrderRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  update({id, code, cpf, date, price, status}: IUpdatedOrderDTO): Promise<Order>
  findById(id: number): Promise<Order | undefined>;
  findByCpf(cpf: string): Promise<Order[] | undefined>;
  delete(order: Order): Promise<void>;
}