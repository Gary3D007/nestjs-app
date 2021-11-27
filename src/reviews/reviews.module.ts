import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./services/reviews.service";
import { FilmsModule } from "../films/films.module";
import { ReviewsMapper } from "./reviews.mapper";
import { ReviewsRepository } from "./reviews.repository";
import { RatingService } from "./services/rating.service";
import { AuthModule } from "../auth/auth.module";
import { CaslModule } from "../casl/casl.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewsRepository]),
    FilmsModule,
    AuthModule,
    CaslModule
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewsMapper, RatingService],
  exports: [ReviewsService]
})
export class ReviewsModule {}
