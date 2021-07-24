
interface Request {
  price: number
}

class OrderPercentageService {
  public execute({ price }:Request): number {
    if (price <= 1000) {
      return 10;

    } else if (price > 1000 && price <= 1500) {
      return 15;
    } 
    return 20;
  }
}

export default OrderPercentageService;