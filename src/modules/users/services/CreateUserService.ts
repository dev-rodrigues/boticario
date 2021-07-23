import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';

import User from '../../../domain/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository) {    
    this.userRepository = userRepository;
  }

  public async execute({fullName, cpf, email, password }: ICreateUserDTO): Promise<User | undefined> {
    const userExists = await this.userRepository.findByEmail(email);
    
    if (userExists) {
      throw new Error('Email already used')
    }

    const hashedPassword = await hash(password, 8);

    const user = this.userRepository.create({
      fullName,
      cpf,
      email,
      password: hashedPassword,
    })
    
    return user
  }
}

export default CreateUserService;