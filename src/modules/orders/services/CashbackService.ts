interface Request {
  price:number;
  percentage: number
}

class CashbackService {
  public  execute( { price, percentage }: Request): number {
    return price * (percentage / 100);
  }
}

export default CashbackService;