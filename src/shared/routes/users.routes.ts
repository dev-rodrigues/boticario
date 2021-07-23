import { Router } from 'express';
import UserRepository from '../../modules/users/infra/typeorm/repositories/UserRepository';
import CreateUserService from '../../modules/users/services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  const userRepository = new UserRepository();

  try {
    const { fullName, cpf, email, password } = req.body;
    const createUser = new CreateUserService(userRepository);
    await createUser.execute({ fullName, cpf, email, password });
    
    return res.json({      
      fullName,
      cpf,
      email
    })
  } catch(err) {
    return res.status(400).json({
      error: err.message
    });
  }
})

export default usersRouter;