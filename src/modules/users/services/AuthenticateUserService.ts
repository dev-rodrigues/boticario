import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import AppError from '../../../domain/errors/AppError';
import authConfig from '../../../configuration/auth';
import User from '../../../domain/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';


interface Request {
  email: string;

  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {

  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,  
    @inject('HashProvider')
    private iHashProvider: IHashProvider
  ) {    
    this.userRepository = userRepository;
  }

  public async execute({ email, password }: Request): Promise<Response> {

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordMatched = await this.iHashProvider.compareHash(password, user.password);

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