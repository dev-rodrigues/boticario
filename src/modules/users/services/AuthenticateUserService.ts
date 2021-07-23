import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '../../../domain/errors/AppError';

import authConfig from '../../../configuration/auth';
import User from '../../../domain/entities/User';
import IUserRepository from '../repositories/IUserRepository';


interface Request {
  email: string;

  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {

  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {    
    this.userRepository = userRepository;
  }

  public async execute({ email, password }: Request): Promise<Response> {

    const user = await this.userRepository.findByEmail(email);

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