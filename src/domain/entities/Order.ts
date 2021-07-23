import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int')
  code: number;

  @Column('decimal')
  price: number;

  @Column('date')
  date: Date;

  @Column('nvarchar')
  cpf: string;

  @Column()
  status: string; 

  constructor(code:number, price:number, date: Date, status:string) {
    this.code = code;
    this.price = price;
    this.date = date;
    this.status = status;
  }
}

export default Order;