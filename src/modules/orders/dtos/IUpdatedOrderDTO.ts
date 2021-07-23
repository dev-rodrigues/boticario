export default interface IUpdatedOrderDTO {
  id: number;
  
  code: number;
  
  price: number;

  date: Date;

  cpf: string;

  status: string;
}