import AppError from "../../../domain/errors/AppError";
import FakeUserRepository from "../infra/repositories/fakes/repositories/FakeUserRepository"
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from "./CreateUserService";


describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUser.execute({
      fullName: 'John Doe',
      cpf: '111.111.111-11',
      email: 'johndoe@example.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  })

  it('should not be able to create a new user with email from another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    await createUser.execute({
      fullName: 'John Doe',
      cpf: '111.111.111-11',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await expect(
      createUser.execute({
        fullName: 'John Doe',
        cpf: '111.111.111-11',
        email: 'johndoe@example.com',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(AppError);
  })

})