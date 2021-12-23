import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param, ParseArrayPipe,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { FilmsService } from "../services/films.service";
import { CreateFilmDto } from "../dto/createFilm.dto";
import { UpdateFilmDto } from "../dto/updateFilmDto";
import { FilmDto } from "../dto/film.dto";
import { Page } from "../../commons/models/page.model";
import { ParseSortParametersPipe } from "../../commons/pipes/parseSortParameters.pipe";
import { SortDirection } from "../../commons/models/sortDirection.enum";

@Controller("films")
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  saveFilm(@Body() film: CreateFilmDto): Promise<FilmDto> {
    return this.filmsService.addFilm(film);
  }

  @Patch(":id")
  updateFilm(
    @Param("id", ParseIntPipe) id: number,
    @Body() film: UpdateFilmDto
  ): Promise<FilmDto> {
    return this.filmsService.updateFilm(id, film);
  }

  @Get(":id")
  getFilmById(
    @Param("id", ParseIntPipe) id: number,
    @Query("withReviews", new DefaultValuePipe(false), ParseBoolPipe)
    withReviews: boolean
  ): Promise<FilmDto> {
    if (withReviews) {
      return this.filmsService.getFilmByIdWithReviews(id);
    }

    return this.filmsService.getFilmById(id);
  }

  @Get()
  getAll(
    @Query("pageNumber", new DefaultValuePipe(1), ParseIntPipe)
    pageNumber: number,
    @Query("pageSize", new DefaultValuePipe(20), ParseIntPipe)
    pageSize: number,
    @Query("sortBy", ParseArrayPipe, new ParseSortParametersPipe(FilmDto))
    sortBy: Map<keyof FilmDto, SortDirection>
  ): Promise<Page<FilmDto>> {
    console.log("Page number", pageNumber, "Page size:", pageSize, sortBy);
    return this.filmsService.findAllPaginated(pageNumber, pageSize, sortBy);
  }

  @Delete(":id")
  deleteFilmById(@Param("id", ParseIntPipe) id: number): Promise<FilmDto> {
    return this.filmsService.deleteFilmById(id);
  }
}
