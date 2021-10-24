import { Injectable } from "@nestjs/common";
import { CreateFilmDto } from "./dto/createFilm.dto";
import { Film } from "./film.entity";
import { UpdateFilmDto } from "./dto/updateFilmDto";
import { FilmDto } from "./dto/film.dto";
import { ReviewDto } from "../reviews/dto/review.dto";

@Injectable()
export class FilmsMapper {
  fromDto(createFilmDto: CreateFilmDto | UpdateFilmDto): Film {
    const result = new Film();
    result.name = createFilmDto.name;
    result.description = createFilmDto.description;
    result.duration = createFilmDto.duration;
    result.releaseDate = createFilmDto.releaseDate;
    return result;
  }

  toDto(film: Film): FilmDto {
    const result = new FilmDto();
    result.id = film.id;
    result.name = film.name;
    result.description = film.description;
    result.duration = film.duration;
    result.releaseDate = film.releaseDate;
    result.averageRating = film.averageRating;
    result.reviews = film.reviews?.map((review) => {
      const result = new ReviewDto();
      result.id = review.id;
      result.filmId = review.filmId;
      result.header = review.header;
      result.body = review.body;
      result.mark = review.mark;
      return result;
    });

    return result;
  }
}
