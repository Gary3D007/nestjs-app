import { Injectable } from "@nestjs/common";
import { UpdateReviewDto } from "./dto/updateReview.dto";
import { Review } from "./review.entity";
import { ReviewDto } from "./dto/review.dto";

@Injectable()
export class ReviewsMapper {
  fromDto(reviewDto: UpdateReviewDto): Review {
    const result = new Review();
    result.header = reviewDto.header;
    result.body = reviewDto.body;
    result.mark = reviewDto.mark;
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
}
