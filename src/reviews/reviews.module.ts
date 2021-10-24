import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./review.entity";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import { FilmsModule } from "../films/films.module";
import { ReviewsMapper } from "./reviews.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([Review]), FilmsModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewsMapper],
  exports: [ReviewsMapper]
})
export class ReviewsModule {}
