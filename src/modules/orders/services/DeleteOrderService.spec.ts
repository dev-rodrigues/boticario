import AppError from "../../../domain/errors/AppError";
import FakeOrderRepository from "../infra/repositories/fakes/repositories/FakeOrderRepository";
import CreateOrderService from "./CreateOrderService";
import DeleteOrderService from "./DeleteOrderService";

describe('DeleteOrderService.spec', () => {
  it('should not allow deleting an order that does not exist', async () => {
    const fakeOrderRepository = new FakeOrderRepository();
    const deleteOrderService = new DeleteOrderService(fakeOrderRepository);
        
    await expect(
      deleteOrderService.execute({
        order_id: 1
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be permit a delete with status equals to approved', async () => {
    const fakeOrderRepository = new FakeOrderRepository();
    const createOrderService = new CreateOrderService(fakeOrderRepository);
    const deleteOrderService = new DeleteOrderService(fakeOrderRepository);

    await createOrderService.execute({
      code: 1,
      cpf: '153.509.460-56',
      date: new Date(),
      price: 1
    });

    await expect(
      deleteOrderService.execute({
        order_id: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('must delete an existing order', async () => {
    const fakeOrderRepository = new FakeOrderRepository();
    const createOrderService = new CreateOrderService(fakeOrderRepository);
    const deleteOrderService = new DeleteOrderService(fakeOrderRepository);

    await createOrderService.execute({
      code: 1,
      cpf: '111.111.111-11',
      date: new Date(),
      price: 1
    });

    const response = await deleteOrderService.execute({
      order_id: 1
    })


    expect(response).toBe(true)
  })
})