import { Injectable } from "@nestjs/common";
import { CreateGenreDto } from "../dto/createGenre.dto";
import { GenreDto } from "../dto/genre.dto";
import { GenresRepository } from "../repositories/genres.repository";
import { Page } from "../../commons/models/page.model";
import { GenresMapper } from "../mappers/genres.mapper";
import { UpdateGenreDto } from "../dto/updateGenre.dto";
import { Genre } from "../model/genre.entity";
import { EntityNotFoundError } from "typeorm";

@Injectable()
export class GenresService {
  constructor(
    private readonly genresRepository: GenresRepository,
    private readonly genresMapper: GenresMapper
  ) {}

  addGenre(genre: CreateGenreDto): Promise<GenreDto> {
    return this.genresRepository.save(genre);
  }

  updateGenre(id: number, genre: UpdateGenreDto): Promise<GenreDto> {
    const genreToUpdate = this.genresMapper.fromDto(genre);
    return this.genresRepository.updateAndReturnUpdated(id, genreToUpdate);
  }

  deleteGenreById(id: number): Promise<GenreDto> {
    return this.genresRepository.deleteAndReturnDeleted(id);
  }

  findAllPaginated(
    pageNumber: number,
    pageSize: number
  ): Promise<Page<GenreDto>> {
    console.log("Service Page number", pageNumber, "Page size:", pageSize);
    return this.genresRepository.findAllPaginated(pageNumber, pageSize);
  }

  async checkGenresExist(ids: number[]): Promise<void> {
    const foundGenres: Genre[] = await this.genresRepository.findByIds(ids);

    if (ids.length !== foundGenres.length) {
      const idsPresentInDB: number[] = foundGenres.map((genre) => genre.id);
      const idsNotPresentInDB: number[] = ids.reduce((accumulator, current) => {
        if (!idsPresentInDB.includes(current)) {
          accumulator.push(current);
        }

        return accumulator;
      }, new Array<number>());

      throw new EntityNotFoundError(Genre, idsNotPresentInDB);
    }
  }
}
