import { EntityRepository, Repository } from "typeorm";
import User from "../../../domain/entities/User";

@EntityRepository(User)
class UserRepository extends Repository<User>{
}

export default UserRepository;