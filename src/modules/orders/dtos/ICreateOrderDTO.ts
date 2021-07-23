export default interface ICreateOrderDTO {
  code: number;
  
  price: number;

  date: Date;

  cpf: string;

  status: string;
}