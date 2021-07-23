import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '../../../services/AuthenticateUserService';

import UserRepository from '../../typeorm/repositories/UserRepository';

class SessionsControllers {

  public async create(request:Request , response:Response):Promise<Response> {
    const { email, password } = request.body;
    const userRepository = container.resolve(UserRepository)
  
    const authenticateUser = new AuthenticateUserService(userRepository);
    
    const { user, token } = await authenticateUser.execute({
      email,
      password
    })
  
    return response.json({
      id: user.id,
      fullname: user.fullName,
      cpf: user.cpf,
      email: user.email,
      token
    });
  }
}

export default SessionsControllers;