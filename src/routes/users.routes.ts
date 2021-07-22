import { Router } from 'express';
import 'express-async-errors';

import CreateUserService from '../service/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  const { fullName, cpf, email, password } = req.body;
  const createUser = new CreateUserService();
  await createUser.execute({ fullName, cpf, email, password });
  
  return res.json({      
    fullName,
    cpf,
    email
  })
})

export default usersRouter;