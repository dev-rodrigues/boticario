import FakeUserRepository from "../../users/infra/repositories/fakes/repositories/FakeUserRepository"
import FakeOrderRepository from "../infra/repositories/fakes/repositories/FakeOrderRepository"
import FetchUserOrdersService from "./FetchUserOrdersService"


describe('FetchUserOrdersService', () => {
  it('should be permit find a users orders', async () => {
    const orderRepository = new FakeOrderRepository();
    const userRepository = new FakeUserRepository();

    const fetchUserOrdersService = new FetchUserOrdersService(orderRepository, userRepository);

    await userRepository.create({
      cpf: '111.111.111-11',
      email: 'mock@mock.com.br',
      fullName: 'mock mock',
      password: '123456'
    });

    await orderRepository.create({
      code: 1,
      cpf: '111.111.111-11',
      date: new Date(),
      price: 1,
      status: 'Em analise'
    })

    const expected = await fetchUserOrdersService.execute({
      user_id: '1'
    })    
    expect(expected).toHaveLength(1)
  })

})