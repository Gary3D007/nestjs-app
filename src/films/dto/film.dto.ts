import { ReviewDto } from "../../reviews/dto/review.dto";
import { IsNotBlank } from "../../commons/validation/validators";
import {
  IsDateString,
  IsNotEmptyObject,
  ValidateNested
} from "class-validator";
import { PostgresInterval } from "../../commons/models/postgresInterval.model";
import { Type } from "class-transformer";
import { GenreDto } from "./genre.dto";

export class FilmDto {
  id: number;
  @IsNotBlank()
  name: string;
  @IsNotBlank()
  description: string;
  @IsDateString()
  releaseDate: string;
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PostgresInterval)
  duration: PostgresInterval;
  averageRating: number;
  reviews?: ReviewDto[];
  genres?: GenreDto[];
}
