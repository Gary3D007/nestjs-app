import { OmitType } from "@nestjs/mapped-types";
import { FilmDto } from "./film.dto";
import { ArrayNotEmpty, IsInt, IsPositive } from "class-validator";

export class CreateFilmDto extends OmitType(FilmDto, [
  "id",
  "averageRating",
  "reviews",
  "genres"
] as const) {
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  genresIds: number[];
}
