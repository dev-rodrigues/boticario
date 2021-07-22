import { EntityRepository, Repository } from "typeorm";
import User from "../domain/entity/User";

@EntityRepository(User)
class UserRepository extends Repository<User>{
}

export default UserRepository;