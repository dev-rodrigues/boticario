import Order from "../../../domain/entities/Order";
import AppError from "../../../domain/errors/AppError";
import FakeOrderRepository from "../infra/repositories/fakes/repositories/FakeOrderRepository";
import CreateOrderService from "./CreateOrderService";
import UpdateOrderService from "./UpdateOrderService";

describe('UpdateOrderService', () => {
  it('must be update an order', async () => {
    const fakeOrderRepository = new FakeOrderRepository();
    const createOrderService = new CreateOrderService(fakeOrderRepository);
    const updateOrderService = new UpdateOrderService(fakeOrderRepository);
    
    await createOrderService.execute({
      code: 1,
      cpf: '111.111.111-11',
      date: new Date(),
      price: 1,      
    });

    const response:Order|undefined = await updateOrderService.execute({
      code: 2,
      cpf: '111.111.111-11',
      date: new Date(),
      id: 1,
      price: 1
    })
  
    expect(response).toHaveProperty('id')
    expect(response).toHaveProperty('code')
    expect(response).toHaveProperty('cpf')    
  })

  it('must not be update an order with status equals approved', async () => {
    const fakeOrderRepository = new FakeOrderRepository();
    const createOrderService = new CreateOrderService(fakeOrderRepository);
    const updateOrderService = new UpdateOrderService(fakeOrderRepository);
    
    await createOrderService.execute({
      code: 1,
      cpf: '153.509.460-56',
      date: new Date(),
      price: 1,      
    });

    expect(
      updateOrderService.execute({
        code: 2,
        cpf: '153.509.460-56',
        date: new Date(),
        id: 1,
        price: 1
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('must not be updated an order when order not exist', async () => {
    const fakeOrderRepository = new FakeOrderRepository();
    const updateOrderService = new UpdateOrderService(fakeOrderRepository);

    expect(
      updateOrderService.execute({
        code: 2,
        cpf: '153.509.460-56',
        date: new Date(),
        id: 1,
        price: 1
      }),
    ).rejects.toBeInstanceOf(AppError);
  })
})