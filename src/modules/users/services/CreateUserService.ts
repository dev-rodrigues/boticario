import { injectable, inject } from 'tsyringe';

import User from '../../../domain/entities/User';

import IUserRepository from '../repositories/IUserRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import AppError from '../../../domain/errors/AppError';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    
    @inject('HashProvider')
    private iHashProvider: IHashProvider) {    
    this.userRepository = userRepository;
  }

  public async execute({fullName, cpf, email, password }: ICreateUserDTO): Promise<User | undefined> {
    const userExists = await this.userRepository.findByEmail(email);
    
    if (userExists) {
      throw new AppError('Email already used', 404)
    }

    const hashedPassword = await this.iHashProvider.generateHash(password);

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