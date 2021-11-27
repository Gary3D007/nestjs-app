import { Injectable } from "@nestjs/common";
import { UpdateReviewDto } from "./dto/updateReview.dto";
import { Review } from "./review.entity";
import { ReviewDto } from "./dto/review.dto";
import { CreateReviewDto } from "./dto/createReview.dto";

@Injectable()
export class ReviewsMapper {
  fromDto(reviewDto: CreateReviewDto): Review {
    const result = new Review();
    result.filmId = reviewDto.filmId;
    result.header = reviewDto.header;
    result.body = reviewDto.body;
    result.mark = reviewDto.mark;
    result.publicationDate = new Date();
    return result;
  }

  toDto(review: Review): ReviewDto {
    const result = new ReviewDto();
    result.id = review.id;
    result.filmId = review.filmId;
    result.header = review.header;
    result.body = review.body;
    result.mark = review.mark;
    return result;
  }

  updateEntityFromDto(reviewDto: UpdateReviewDto, review: Review): void {
    review.mark = reviewDto.mark ?? review.mark;
    review.header = reviewDto.header ?? review.header;
    review.body = reviewDto.body ?? review.body;
  }
}
