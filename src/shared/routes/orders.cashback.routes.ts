import { Router } from 'express';
import 'express-async-errors';

import ensureAuthenticated from '../infra/http/middlewares/EnsureAuthenticated';
import RequestExternalApiService from '../infra/http/service/RequestExternalApiService';

const cashBackRouter = Router();

cashBackRouter.get('/', ensureAuthenticated, async (req, res) => {  
  const user_id = req.user.id;

  const callApi = new RequestExternalApiService();
  const response = await callApi.execute({ user_id })

  return res.json(response)
});

export default cashBackRouter;