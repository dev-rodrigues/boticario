import { Router } from "express";
import 'express-async-errors';
import UserRepository from "../../modules/users/infra/typeorm/repositories/UserRepository";
import AuthenticateUserService from "../../modules/users/services/AuthenticateUserService";


const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {  
  const { email, password } = req.body;
  const userRepository = new UserRepository();

  const authenticateUser = new AuthenticateUserService(userRepository);
  
  const { user, token } = await authenticateUser.execute({
    email,
    password
  })

  return res.json({
    id: user.id,
    fullname: user.fullName,
    cpf: user.cpf,
    email: user.email,
    token
  });
});

export default sessionsRouter;