import { AbstractCrudRepository } from "../../commons/abstractCrudRepository.provider";
import { Genre } from "../model/genre.entity";
import { EntityRepository } from "typeorm";

@EntityRepository(Genre)
export class GenresRepository extends AbstractCrudRepository<Genre> {
  constructor() {
    super(Genre);
  }
}
