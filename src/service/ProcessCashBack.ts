import Order from "../domain/entity/Order";
import CashbackDTO from "../domain/objectsValues/CashbackDTO";
import OrderDTO from "../domain/objectsValues/OrderDTO";

class ProcessCashBack {

  public execute(orders:Order[]): OrderDTO[] {
    let processed:OrderDTO[] = [];

    orders.forEach(element => {      
      processed.push(this.processCashBack(element))
    });

    return processed;
  }
  
  private processCashBack(order:Order):OrderDTO {
    const percentage = this.getPercentage(order.price);
    const valueOfReturn = this.getReturn(order.price, percentage);

    const cashbackDTO = new CashbackDTO(percentage, valueOfReturn);    
    return this.getOrderDTO(order, cashbackDTO);
  }

  private getPercentage(price:number): number {
    if (price <= 1000) {
      return 10;

    } else if (price > 1000 && price <= 1500) {
      return 15;
    } 
    return 20;
  }

  private getReturn(price:number, percentage: number): number {
    return price * (percentage / 100);
  }

  private getOrderDTO(order:Order, cashbackDTO:CashbackDTO): OrderDTO {
    return new OrderDTO(order, cashbackDTO);
  }
}

export default ProcessCashBack;