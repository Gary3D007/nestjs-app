import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { GenresService } from "../services/genres.service";
import { CreateGenreDto } from "../dto/createGenre.dto";
import { GenreDto } from "../dto/genre.dto";
import { Page } from "../../commons/models/page.model";

@Controller("genres")
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  addGenre(@Body() genre: CreateGenreDto): Promise<GenreDto> {
    return this.genresService.addGenre(genre);
  }

  @Patch(":id")
  updateGenre(
    @Param("id", ParseIntPipe) id: number,
    @Body() genre: CreateGenreDto
  ): Promise<GenreDto> {
    return this.genresService.updateGenre(id, genre);
  }

  @Delete(":id")
  deleteGenreById(@Param("id", ParseIntPipe) id: number): Promise<GenreDto> {
    return this.genresService.deleteGenreById(id);
  }

  @Get()
  getAll(
    @Query("pageNumber", new DefaultValuePipe(1), ParseIntPipe)
    pageNumber: number,
    @Query("pageSize", new DefaultValuePipe(20), ParseIntPipe)
    pageSize: number
  ): Promise<Page<GenreDto>> {
    console.log("Page number", pageNumber, "Page size:", pageSize);
    return this.genresService.findAllPaginated(pageNumber, pageSize);
  }
}
