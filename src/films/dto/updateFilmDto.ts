import { CreateFilmDto } from "./createFilm.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateFilmDto extends PartialType(CreateFilmDto) {}
