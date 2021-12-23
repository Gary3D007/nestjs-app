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
import { Sortable } from "../../commons/models/sortable";

export class FilmDto implements Sortable<FilmDto> {
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

  getSortByFields(): Array<keyof FilmDto> {
    return ["name", "description", "releaseDate", "duration", "averageRating"];
  }
}
