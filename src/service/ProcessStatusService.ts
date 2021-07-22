import whiteList from "../domain/utils/WhiteList";

interface Request {
  cpf: string;
}

class ProcessStatusService {
  public execute({ cpf }: Request): string {
    const found = whiteList.find(element => element === cpf)

    return Boolean(found) ? "Aprovado" : "Em validação";
  }
}

export default ProcessStatusService;