import { Injectable } from "@nestjs/common";
import { GenreDto } from "../dto/genre.dto";
import { Genre } from "../model/genre.entity";
import { UpdateGenreDto } from "../dto/updateGenre.dto";
import { CreateFilmDto } from "../dto/createFilm.dto";

@Injectable()
export class GenresMapper {
  toDto(genre: Genre): GenreDto {
    const result = new GenreDto();
    result.name = genre.name;
    return result;
  }

  fromDto(genre: CreateFilmDto | UpdateGenreDto): Genre {
    const result = new Genre();
    result.name = genre.name;
    return result;
  }
}
