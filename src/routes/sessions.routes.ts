import { Router } from "express";
import 'express-async-errors';

import AuthenticateUserService from "../service/AuthenticateUserService";

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUser = new AuthenticateUserService();
  
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