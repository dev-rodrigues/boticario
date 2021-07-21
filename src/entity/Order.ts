import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int')
  codigo: number;

  @Column('decimal')
  valor: number;

  @Column('date')
  data: Date;

  @Column('nvarchar')
  cpf: string;
}

export default Order;