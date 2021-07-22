import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from "../domain/entity/User";
import UserRepository from "../repositories/UserRepository";

interface Request {
  fullName: string;

  cpf: string;

  email: string;

  password: string;
}

class CreateUserService {
  public async execute({fullName, cpf, email, password }: Request): Promise<User | null> {
    const userRepository = getCustomRepository(UserRepository);

    const userExists = await userRepository.findOne({
      where: { email},
    })


    if (userExists) {
      throw new Error('Email already used')
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      fullName,
      cpf,
      email,
      password: hashedPassword,
    })

    await userRepository.save(user);

    return user
  }
}

export default CreateUserService;