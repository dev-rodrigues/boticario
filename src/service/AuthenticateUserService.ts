import { compare } from 'bcryptjs';
import { getRepository } from "typeorm";
import { sign } from 'jsonwebtoken';
import User from "../domain/entity/User";
import authConfig from '../configuration/auth';

import AppError from '../domain/errors/AppError';

interface Request {
  email: string;

  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne( { where: { email }})

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id.toString(),
      expiresIn: authConfig.jwt.expiresIn
    });

    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserService;