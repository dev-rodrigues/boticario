import FakeOrderRepository from "../infra/repositories/fakes/repositories/FakeOrderRepository";
import CreateOrderService from "./CreateOrderService";

describe('CreateOrderService', () => {
  it('should be able to create a new Order', async () => {
    const fakeOrderRepository = new FakeOrderRepository();
    const createOrderService = new CreateOrderService(fakeOrderRepository);
    

    const order = await createOrderService.execute({
      code: 1,
      cpf: '111.111.111-11',
      date: new Date(),
      price: 1
    });
    

    expect(order).toHaveProperty('id');
  })
})