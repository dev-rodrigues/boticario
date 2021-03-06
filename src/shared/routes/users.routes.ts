import { Router } from 'express';
import UsersControllers from '../../modules/users/infra/http/controllers/UsersControllers';

const usersRouter = Router();
const usersControllers = new UsersControllers();

usersRouter.post('/', usersControllers.create)

export default usersRouter;