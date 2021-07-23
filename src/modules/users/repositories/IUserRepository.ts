import User from "../../../domain/entities/User";
import ICreateUserDTO from "../dtos/ICreateUserDTO";

export default interface IUserRepository {

  create(data: ICreateUserDTO): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(user_id: number): Promise<User | undefined>;

}