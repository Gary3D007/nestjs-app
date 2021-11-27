import { Injectable } from "@nestjs/common";
import { FilmsRepository } from "../../films/films.repository";
import { ReviewsRepository } from "../reviews.repository";

@Injectable()
export class RatingService {
  constructor(
    private readonly filmsRepository: FilmsRepository,
    private readonly reviewsRepository: ReviewsRepository
  ) {}

  async updateRating(filmId: number): Promise<void> {
    const newRating = await this.calculateNewRating(filmId);
    await this.filmsRepository.updateFilmRating(filmId, newRating);
  }

  private async calculateNewRating(filmId: number): Promise<number> {
    const existingMarks: number[] =
      await this.reviewsRepository.getAllMarksForFilm(filmId);
    const averageDouble =
      existingMarks.reduce((a, b) => a + b, 0) / existingMarks.length;

    return Math.round(averageDouble);
  }
}
