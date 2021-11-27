import { Film } from "./film.entity";
import { EntityRepository } from "typeorm";
import { AbstractCrudRepository } from "../commons/abstractCrudRepository.provider";

@EntityRepository(Film)
export class FilmsRepository extends AbstractCrudRepository<Film> {
  constructor() {
    super(Film);
  }

  updateFilmRating(id: number, rating: number): Promise<Film> {
    return this.findAndExecuteAction(
      () => this.preload({ id, averageRating: rating }),
      (entity) => this.save(entity),
      () => this.getNotFoundException(id)
    );
  }
}
