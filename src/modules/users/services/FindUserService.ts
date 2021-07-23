import { getCustomRepository } from "typeorm";
import User from "../../../domain/entities/User";
import IUserRepository from "../repositories/IUserRepository";

interface Request {
  id: number;
}

class FindUserService {
  
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {    
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