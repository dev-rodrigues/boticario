import AppError from "../../../domain/errors/AppError";
import FakeUserRepository from "../infra/repositories/fakes/repositories/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService"

describe('AuthenticateUserService', () => {
  it('should be able to authenticate', async () => {  
    const fakeUsersRepository = new FakeUserRepository;
    const fakeHashProvider = new FakeHashProvider;

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

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
  });

  it('should not be able to authenticate with a non existing user', async () => {
    const fakeUsersRepository = new FakeUserRepository;
    const fakeHashProvider = new FakeHashProvider;

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);    
    
    await expect(
      authenticateUser.execute({
        email: 'lala@example.com',
        password: '1234'
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUserRepository;
    const fakeHashProvider = new FakeHashProvider;

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    await createUser.execute({
      fullName: 'John Doe',
      cpf: '111.111.111-11',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password'
      }),
    ).rejects.toBeInstanceOf(AppError);
  })
})