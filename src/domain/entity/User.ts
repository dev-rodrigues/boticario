import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fullName: string;

  @Column()
  cpf: string;

  @Column()  
  email: string;

  @Column()
  password?: string;
}

export default User;