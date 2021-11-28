import { Injectable } from "@nestjs/common";
import { Film } from "../model/film.entity";
import { FilmsMapper } from "../mappers/films.mapper";
import { CreateFilmDto } from "../dto/createFilm.dto";
import { UpdateFilmDto } from "../dto/updateFilmDto";
import { FilmDto } from "../dto/film.dto";
import { FilmsRepository } from "../repositories/films.repository";
import { Page } from "../../commons/models/page.model";
import { GenresService } from "./genres.service";

@Injectable()
export class FilmsService {
  constructor(
    private readonly filmsMapper: FilmsMapper,
    private readonly filmsRepository: FilmsRepository,
    private readonly genresService: GenresService
  ) {}

  async addFilm(filmDto: CreateFilmDto): Promise<FilmDto> {
    await this.genresService.checkGenresExist(filmDto.genresIds);
    const filmToCreate: Film = this.filmsMapper.fromDto(filmDto);
    const createdFilm: Film = await this.filmsRepository.save(filmToCreate);
    return this.filmsMapper.toDto(createdFilm);
  }

  async updateFilm(id: number, film: UpdateFilmDto): Promise<FilmDto> {
    if (film.genresIds) {
      await this.genresService.checkGenresExist(film.genresIds);
    }

    const filmToUpdate: Film = this.filmsMapper.fromDto(film);

    const updatedFilm: Film = await this.filmsRepository.updateAndReturnUpdated(
      id,
      filmToUpdate
    );

    return this.filmsMapper.toDto(updatedFilm);
  }

  async getFilmById(id: number): Promise<FilmDto> {
    const foundFilm: Film = await this.filmsRepository.findOneOrFail(id, {
      relations: ["genres"]
    });
    return this.filmsMapper.toDto(foundFilm);
  }

  async getFilmByIdWithReviews(id: number): Promise<FilmDto> {
    const foundFilm: Film = await this.filmsRepository.findOneOrFail(id, {
      relations: ["genres", "reviews"]
    });
    return this.filmsMapper.toDto(foundFilm);
  }

  async findAllPaginated(
    pageNumber: number,
    pageSize: number
  ): Promise<Page<FilmDto>> {
    console.log("Service Page number", pageNumber, "Page size:", pageSize);
    const page = await this.filmsRepository.findAllPaginated(
      pageNumber,
      pageSize
    );

    return page.map(this.filmsMapper.toDto);
  }

  async doesFilmExist(id: number): Promise<boolean> {
    const film: Film = await this.filmsRepository.findOne(id, {
      select: ["id"]
    });

    return !!film.id;
  }

  async deleteFilmById(id: number): Promise<FilmDto> {
    const deletedFilm = await this.filmsRepository.deleteAndReturnDeleted(id);
    return this.filmsMapper.toDto(deletedFilm);
  }
}
