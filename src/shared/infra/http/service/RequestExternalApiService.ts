
import objectsValues from '../../../objectsValues/Url';

import axios from 'axios';
import AppError from "../../../errors/AppError";
import FindUserService from '../../../../modules/users/services/FindUserService';

interface Request {
  user_id: string;
}

class RequestExternalApiService {
  public async execute( { user_id }: Request): Promise<string> {

    try {
      const findUserService = new FindUserService();
      const user = await findUserService.execute({ user_id: parseInt(user_id) });
      const cpf = user.cpf.replace(/[^\d]+/g,'');

      const response = await axios.get(objectsValues.urls.cashback, { params: { cpf }})
      const body: string = response.data.body

      return body;
    } catch {
      throw new AppError('External error', 500);
    }
  }
}

export default RequestExternalApiService;