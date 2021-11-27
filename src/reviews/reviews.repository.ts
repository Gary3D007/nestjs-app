import { AbstractCrudRepository } from "../commons/abstractCrudRepository.provider";
import { Review } from "./review.entity";
import { EntityRepository } from "typeorm";

@EntityRepository(Review)
export class ReviewsRepository extends AbstractCrudRepository<Review> {
  constructor() {
    super(Review);
  }

  async getAllMarksForFilm(filmId: number): Promise<number[]> {
    return (await this.find({ select: ["mark"], where: { filmId } })).map(
      (review) => review.mark
    );
  }
}
