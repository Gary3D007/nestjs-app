import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { FilmsService } from "../../films/services/films.service";
import { CreateReviewDto } from "../dto/createReview.dto";
import { UpdateReviewDto } from "../dto/updateReview.dto";
import { ReviewsMapper } from "../reviews.mapper";
import { ReviewDto } from "../dto/review.dto";
import { ReviewsRepository } from "../reviews.repository";
import { RatingService } from "./rating.service";
import { User } from "../../users/user.entity";
import { CaslAbilityFactory } from "../../casl/caslAbility.factory";
import { Action } from "../../casl/model/action";
import { Review } from "../review.entity";

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewsRepository: ReviewsRepository,
    private readonly reviewsMapper: ReviewsMapper,
    private readonly filmsService: FilmsService,
    private readonly ratingService: RatingService,
    private readonly caslAbilityFactory: CaslAbilityFactory
  ) {}

  async addReview(review: CreateReviewDto, user: User): Promise<ReviewDto> {
    const filmId: number = review.filmId;
    if (!(await this.filmsService.doesFilmExist(filmId))) {
      throw new NotFoundException(`Film with id ${filmId} not found`);
    }

    const reviewToCreate = this.reviewsMapper.fromDto(review);
    reviewToCreate.user = user;
    const createdReview = await this.reviewsRepository.save(reviewToCreate);
    await this.ratingService.updateRating(filmId);

    return this.reviewsMapper.toDto(createdReview);
  }

  async updateReview(
    id: number,
    updateReviewDto: UpdateReviewDto,
    user: User
  ): Promise<ReviewDto> {
    const existingReview = await this.reviewsRepository.findOneOrFail(id);

    this.checkActionAllowed(
      user,
      existingReview,
      Action.Update,
      "Review can't be updated"
    );

    const existingMark = existingReview.mark;
    this.reviewsMapper.updateEntityFromDto(updateReviewDto, existingReview);
    const updatedReview = await this.reviewsRepository.save(existingReview);

    if (!updatedReview) {
      throw new InternalServerErrorException(
        `Failed to update review with id ${id}`
      );
    }

    if (updatedReview.mark !== existingMark) {
      await this.ratingService.updateRating(updatedReview.filmId);
    }

    return this.reviewsMapper.toDto(updatedReview);
  }

  async deleteReview(id: number, user: User): Promise<ReviewDto> {
    const reviewToDelete = await this.reviewsRepository.findOneOrFail(id);

    this.checkActionAllowed(
      user,
      reviewToDelete,
      Action.Delete,
      "Review can't be deleted"
    );

    const deletedReview = await this.reviewsRepository.remove(reviewToDelete);
    return this.reviewsMapper.toDto(deletedReview);
  }

  private checkActionAllowed(
    user: User,
    review: Review,
    action: Action,
    errMessage: string
  ) {
    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.cannot(action, review)) {
      throw new ForbiddenException(errMessage);
    }
  }
}
