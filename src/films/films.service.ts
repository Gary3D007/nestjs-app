import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { DeleteResult, Repository } from "typeorm";
import { Film } from "./film.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FilmsMapper } from "./films.mapper";
import { CreateFilmDto } from "./dto/createFilm.dto";
import { UpdateFilmDto } from "./dto/updateFilmDto";
import { FilmDto } from "./dto/film.dto";

@Injectable()
export class FilmsService {
  constructor(
    private readonly filmsMapper: FilmsMapper,
    @InjectRepository(Film) private readonly filmsRepository: Repository<Film>
  ) {}

  async addFilm(filmDto: CreateFilmDto): Promise<number> {
    let createdFilm: Film;

    try {
      const filmToCreate = this.filmsMapper.fromDto(filmDto);
      filmToCreate.averageRating = 0;
      createdFilm = await this.filmsRepository.save(filmToCreate);
    } catch (e) {
      console.error("Error saving film", e);
    }

    return createdFilm.id;
  }

  async updateFilm(id: number, film: UpdateFilmDto): Promise<FilmDto> {
    const filmToUpdate: Film = this.filmsMapper.fromDto(film);
    filmToUpdate.id = id;
    const updatedFilm = await this.filmsRepository.preload(filmToUpdate);

    if (!updatedFilm) {
      throw new NotFoundException(`Film with id ${id} not found.`);
    }

    const updateResult = await this.filmsRepository.update(id, filmToUpdate);

    if (updateResult.affected === 0) {
      throw new InternalServerErrorException(
        `Failed to update film with id ${id}`
      );
    }

    return this.filmsMapper.toDto(updatedFilm);
  }

  async getFilmById(id: number): Promise<FilmDto> {
    const foundFilm: Film = await this.filmsRepository.findOne(id);

    if (!foundFilm) {
      throw new NotFoundException(`Film with id ${id} not found.`);
    }

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

  findAllPaginated(pageNumber: number, pageSize: number): Promise<Film[]> {
    console.log("Service Page number", pageNumber, "Page size:", pageSize);
    return this.filmsRepository.find({
      skip: pageNumber - 1,
      take: pageSize
    });
  }

  async doesFilmExist(id: number): Promise<boolean> {
    const film: Film = await this.filmsRepository.findOne(id, {
      select: ["id"]
    });

    return !!film.id;
  }

  deleteFilmById(id: number): Promise<DeleteResult> {
    return this.filmsRepository.delete(id);
  }
}
