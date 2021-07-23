import { Router } from "express";
import 'express-async-errors';
import SessionsControllers from "../../modules/users/infra/http/controllers/SessionsControllers";

const sessionsRouter = Router();
const sessionsControllers = new SessionsControllers();

sessionsRouter.post('/', sessionsControllers.create);

export default sessionsRouter;