import { IPostgresInterval } from "postgres-interval";
import { ReviewDto } from "../../reviews/dto/review.dto";

export class FilmDto {
  id: number;
  name: string;
  description: string;
  releaseDate: Date;
  duration: IPostgresInterval;
  averageRating: number;
  reviews?: ReviewDto[];
}
