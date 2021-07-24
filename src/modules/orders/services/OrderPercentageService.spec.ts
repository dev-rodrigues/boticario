import OrderPercentageService from "./OrderPercentageService";

describe('OrderPercentageService', () => {
  it('must return 10 percent', () => {
    const orderPercentageService = new OrderPercentageService();

    const expected = orderPercentageService.execute({
      price: 1000
    })

    expect(expected).toBe(10)
  });

  it('must return 15 percent', () => {
    const orderPercentageService = new OrderPercentageService();

    const expected = orderPercentageService.execute({
      price: 1500
    })

    expect(expected).toBe(15)
  })

  it('must return 20 percent', () => {
    const orderPercentageService = new OrderPercentageService();

    const expected = orderPercentageService.execute({
      price: 2000
    })
    expect(expected).toBe(20)
  })
})