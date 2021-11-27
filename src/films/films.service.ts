import { Injectable, NotFoundException } from "@nestjs/common";
import { Film } from "./film.entity";
import { FilmsMapper } from "./films.mapper";
import { CreateFilmDto } from "./dto/createFilm.dto";
import { UpdateFilmDto } from "./dto/updateFilmDto";
import { FilmDto } from "./dto/film.dto";
import { FilmsRepository } from "./films.repository";
import { Page } from "../commons/models/page,model";

@Injectable()
export class FilmsService {
  constructor(
    private readonly filmsMapper: FilmsMapper,
    private readonly filmsRepository: FilmsRepository
  ) {}

  async addFilm(filmDto: CreateFilmDto): Promise<FilmDto> {
    const filmToCreate = this.filmsMapper.fromDto(filmDto);
    const createdFilm = await this.filmsRepository.save(filmToCreate);
    return this.filmsMapper.toDto(createdFilm);
  }

  async updateFilm(id: number, film: UpdateFilmDto): Promise<FilmDto> {
    const filmToUpdate: Film = this.filmsMapper.fromDto(film);

    const updatedFilm = await this.filmsRepository.updateAndReturnUpdated(
      id,
      filmToUpdate
    );

    return this.filmsMapper.toDto(updatedFilm);
  }

  async getFilmById(id: number): Promise<FilmDto> {
    const foundFilm: Film = await this.filmsRepository.findOneOrFail(id);
    return this.filmsMapper.toDto(foundFilm);
  }

  async getFilmByIdWithReviews(id: number): Promise<FilmDto> {
    const foundFilm: Film = await this.filmsRepository.findOne(id, {
      relations: ["reviews"]
    });

    if (!foundFilm) {
      throw new NotFoundException(`Film with id ${id} not found.`);
    }

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
