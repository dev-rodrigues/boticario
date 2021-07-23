import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../services/CreateUserService';
import UserRepository from '../../typeorm/repositories/UserRepository';

class UsersControllers {
  public async create(request:Request , response:Response):Promise<Response> {
    try {
      const { fullName, cpf, email, password } = request.body;
      
      const userRepository = container.resolve(UserRepository)

      const createUser = new CreateUserService(userRepository);
      await createUser.execute({ fullName, cpf, email, password });
      
      return response.json({      
        fullName,
        cpf,
        email
      })
    } catch(err) {
      return response.status(400).json({
        error: err.message
      });
    }
  }
}

export default UsersControllers;