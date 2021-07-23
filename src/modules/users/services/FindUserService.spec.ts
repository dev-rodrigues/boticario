import AppError from "../../../domain/errors/AppError";

import FakeUserRepository from "../infra/repositories/fakes/repositories/FakeUserRepository"
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from "./CreateUserService";
import FindUserService from "./FindUserService";


describe('FindUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const findUserService = new FindUserService(fakeUserRepository);

    await createUser.execute({
      fullName: 'John Doe',
      cpf: '111.111.111-11',
      email: 'johndoe@example.com',
      password: '123456'
    });

    const located = await findUserService.execute( {
      id: 1
    })
    expect(located).toHaveProperty('id');
  });

  it ('it should not be located an user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const findUserService = new FindUserService(fakeUserRepository);

    await expect(
      findUserService.execute({
        id: 1
      }),
    ).rejects.toBeInstanceOf(AppError);
  })
})