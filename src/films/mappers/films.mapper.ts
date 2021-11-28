import { Injectable } from "@nestjs/common";
import { CreateFilmDto } from "../dto/createFilm.dto";
import { Film } from "../model/film.entity";
import { UpdateFilmDto } from "../dto/updateFilmDto";
import { FilmDto } from "../dto/film.dto";
import { ReviewDto } from "../../reviews/dto/review.dto";
import { GenreDto } from "../dto/genre.dto";
import { Genre } from "../model/genre.entity";

@Injectable()
export class FilmsMapper {
  fromDto(filmDto: CreateFilmDto | UpdateFilmDto): Film {
    const result = new Film();
    result.name = filmDto.name;
    result.description = filmDto.description;
    result.duration = filmDto.duration;
    result.releaseDate = filmDto.releaseDate;
    result.averageRating = 0;
    result.genres = filmDto.genresIds?.map((id) => {
      const result = new Genre();
      result.id = id;
      return result;
    });
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

    result.genres = film.genres?.map((genre) => {
      const result = new GenreDto();
      result.id = genre.id;
      result.name = genre.name;
      return result;
    });

    return result;
  }
}
