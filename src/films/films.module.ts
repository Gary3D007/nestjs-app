import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilmsController } from "./films.controller";
import { FilmsService } from "./films.service";
import { FilmsMapper } from "./films.mapper";
import { FilmsRepository } from "./films.repository";

@Module({
  imports: [TypeOrmModule.forFeature([FilmsRepository])],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsMapper],
  exports: [FilmsService, TypeOrmModule]
})
export class FilmsModule {}
