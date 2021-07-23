import { injectable, inject } from 'tsyringe';

import User from "../../../domain/entities/User";
import AppError from '../../../domain/errors/AppError';
import IUserRepository from "../repositories/IUserRepository";

interface Request {
  id: number;
}

@injectable()
class FindUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository) {    
    this.userRepository = userRepository;
  }

  public async execute({ id }: Request):Promise<User> {

    const user = await this.userRepository.findById(id)
    
    if (!user) {
      throw new AppError('User does not exists', 404)
    }

    return user
  }
}

export default FindUserService;