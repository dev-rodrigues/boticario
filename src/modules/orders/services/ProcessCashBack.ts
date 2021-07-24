import Order from "../../../domain/entities/Order";
import CashbackDTO from "../../../shared/objectsValues/CashbackDTO";
import OrderDTO from "../../../shared/objectsValues/OrderDTO";
import CashbackService from "./CashbackService";
import OrderPercentageService from "./OrderPercentageService";

class ProcessCashBack {
  
  private orderPercentageService: OrderPercentageService;
  private cashbackService: CashbackService;

  constructor() {
    this.orderPercentageService = new OrderPercentageService();
    this.cashbackService = new CashbackService();
  }

  public execute(orders:Order[]): OrderDTO[] {
    let processed:OrderDTO[] = [];

    orders.forEach(element => processed.push(this.processCashBack(element)));
    return processed;
  }
  
  private processCashBack(order:Order):OrderDTO {
    const percentage = this.orderPercentageService.execute({ price: order.price});
    const valueOfReturn = this.cashbackService.execute({ percentage: order.price, price: order.price });

    const cashbackDTO = new CashbackDTO(percentage, valueOfReturn);    
    return this.getOrderDTO(order, cashbackDTO);
  }

  private getOrderDTO(order:Order, cashbackDTO:CashbackDTO): OrderDTO {
    return new OrderDTO(order, cashbackDTO);
  }
}

export default ProcessCashBack;