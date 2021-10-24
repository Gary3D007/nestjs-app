import { DeleteResult, Repository } from "typeorm";
import { Review } from "./review.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { FilmsService } from "../films/films.service";
import { CreateReviewDto } from "./dto/createReview.dto";
import { UpdateReviewDto } from "./dto/updateReview.dto";
import { ReviewsMapper } from "./reviews.mapper";
import { ReviewDto } from "./dto/review.dto";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    private readonly reviewsMapper: ReviewsMapper,
    private readonly filmsService: FilmsService
  ) {}

  async addReview(review: CreateReviewDto): Promise<number> {
    if (!(await this.filmsService.doesFilmExist(review.filmId))) {
      throw new NotFoundException(`Film with id ${review.filmId} not found`);
    }

    const reviewToCreate = this.reviewsMapper.fromDto(review);
    let createdReview: Review;
    try {
      createdReview = await this.reviewsRepository.save(reviewToCreate);
    } catch (e) {
      console.error("Error creating review");
    }

    return createdReview.id;
  }

  async updateReview(
    id: number,
    updateReviewDto: UpdateReviewDto
  ): Promise<ReviewDto> {
    const reviewToUpdate: Review = this.reviewsMapper.fromDto(updateReviewDto);
    reviewToUpdate.id = id;
    const updatedReview = await this.reviewsRepository.preload(reviewToUpdate);

    if (!updatedReview) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    const updateResult = await this.reviewsRepository.update(id, updatedReview);

    if (updateResult.affected === 0) {
      throw new InternalServerErrorException(
        `Failed to update review with id ${id}`
      );
    }

    return this.reviewsMapper.toDto(updatedReview);
  }

  deleteReview(id: number): Promise<DeleteResult> {
    return this.reviewsRepository.delete(id);
  }
}
