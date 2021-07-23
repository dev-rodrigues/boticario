import { injectable, inject } from 'tsyringe';

import User from "../../../domain/entities/User";
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
      throw new Error('User does not exists')
    }

    return user
  }
}

export default FindUserService;