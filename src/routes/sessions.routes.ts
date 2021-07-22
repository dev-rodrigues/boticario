import { Router } from "express";
import AuthenticateUserService from "../service/AuthenticateUserService";

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
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
    
  } catch(err) {
    return res.status(400).json({
      error: err.message
    });
  }
});

export default sessionsRouter;