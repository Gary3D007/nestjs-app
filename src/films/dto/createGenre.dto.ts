import { OmitType } from "@nestjs/mapped-types";
import { GenreDto } from "./genre.dto";

export class CreateGenreDto extends OmitType(GenreDto, ["id"] as const) {}
