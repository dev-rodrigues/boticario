import CashbackService from "./CashbackService";
import OrderPercentageService from "./OrderPercentageService";

describe('CashbackService', () => {
  it('must return 1 cashback', () => {

    const cashbackService = new CashbackService();
    
    const expected = cashbackService.execute({
      percentage: 10,
      price: 10
    })

    expect(expected).toBe(1)
  });  
})