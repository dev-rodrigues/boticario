import User from "../../../../../../domain/entities/User";
import ICreateUserDTO from "../../../../dtos/ICreateUserDTO";
import IUserRepository from "../../../../repositories/IUserRepository";

class FakeUserRepository implements IUserRepository {

  private savedUsers: User[] = []

  async create({fullName, cpf, email, password}: ICreateUserDTO): Promise<User | undefined> {
    const user = new User();
    Object.assign(
      user,
      { 
        id: 1,
        fullName,
        cpf,
        email,
        password
      }
    );

    this.savedUsers.push(user);
    return user;
  }

  async findById(user_id: number): Promise<User | undefined> {
    const findUser = this.savedUsers.find( user => user.id === user_id)
    return findUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.savedUsers.find( user => user.email === email)
    return findUser;
  }
}

export default FakeUserRepository;