import FakeUserRepository from "../infra/repositories/fakes/repositories/FakeUserRepository"
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService"




describe('AuthenticateUserService', () => {
  it('should be able to authenticate', async () => {  
    const fakeUsersRepository = new FakeUserRepository;

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository);
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      fullName: 'john doe',
      cpf: '111.111.111-11',
      email: 'johndoe@example.com',
      password: 'password',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
  })
})