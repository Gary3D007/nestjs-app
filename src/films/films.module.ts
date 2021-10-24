import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Film } from "./film.entity";
import { FilmsController } from "./films.controller";
import { FilmsService } from "./films.service";
import { FilmsMapper } from "./films.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([Film])],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsMapper],
  exports: [FilmsService, TypeOrmModule]
})
export class FilmsModule {}
