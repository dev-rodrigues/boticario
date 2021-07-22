import { getCustomRepository } from "typeorm";
import User from "../domain/entity/User";
import UserRepository from "../repositories/UserRepository";

interface Request {
  user_id: number;
}

class FindUserService {
  public async execute({ user_id }: Request):Promise<User> {
    const repository = getCustomRepository(UserRepository);
    const user = await repository.findOne({
      where: {id:  user_id}
    })
    if (!user) {
      throw new Error('User does not exists')
    }
    return user
  }
}

export default FindUserService;