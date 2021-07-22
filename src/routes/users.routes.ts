import { Router } from 'express';
import CreateUserService from '../service/CreateUserService';
import validate from '../middlewares/ValidateUsersRoutes';

const usersRouter = Router();

usersRouter.post('/', validate, async (req, res) => {
  try {
    const { fullName, cpf, email, password } = req.body;
    const createUser = new CreateUserService();
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