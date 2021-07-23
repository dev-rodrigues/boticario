import { getRepository, Repository } from "typeorm";
import User from "../../../../../../domain/entities/User";
import ICreateUserDTO from "../../../../dtos/ICreateUserDTO";
import IUserRepository from "../../../../repositories/IUserRepository";

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create({fullName, cpf, email, password}: ICreateUserDTO): Promise<User | undefined> {
    const user = this.ormRepository.create({
      fullName,
      cpf,
      email,
      password
    })

    return await this.ormRepository.save(user);    
  }

  findById(user_id: number): Promise<User | undefined> {
    return this.ormRepository.findOne({where: {id:  user_id} });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.ormRepository.findOne( { where: { email }});
  }
}

export default UserRepository;