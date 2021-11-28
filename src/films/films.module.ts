import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilmsController } from "./controllers/films.controller";
import { FilmsService } from "./services/films.service";
import { FilmsMapper } from "./mappers/films.mapper";
import { FilmsRepository } from "./repositories/films.repository";
import { GenresService } from "./services/genres.service";
import { GenresRepository } from "./repositories/genres.repository";
import { GenresController } from "./controllers/genres.controller";
import { GenresMapper } from "./mappers/genres.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([FilmsRepository, GenresRepository])],
  controllers: [FilmsController, GenresController],
  providers: [FilmsService, FilmsMapper, GenresService, GenresMapper],
  exports: [FilmsService, TypeOrmModule]
})
export class FilmsModule {}
