import { AbstractCrudRepository } from "../commons/abstractCrudRepository.provider";
import { User } from "./user.entity";
import { EntityRepository } from "typeorm";

@EntityRepository(User)
export class UsersRepository extends AbstractCrudRepository<User> {
  constructor() {
    super(User);
  }
}
