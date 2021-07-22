import Order from "../entity/Order";
import CashbackDTO from "./CashbackDTO";

class OrderDTO {
  order: Order;

  cashback: CashbackDTO;

  constructor(order: Order, cashback: CashbackDTO) {
    this.order = order;
    this.cashback = cashback;
  }
}

export default OrderDTO;