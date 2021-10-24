import { ReviewsService } from "./reviews.service";
import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from "@nestjs/common";
import { CreateReviewDto } from "./dto/createReview.dto";
import { UpdateReviewDto } from "./dto/updateReview.dto";

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  createReview(@Body() createReviewDto: CreateReviewDto): Promise<number> {
    return this.reviewsService.addReview(createReviewDto);
  }

  @Patch(":id")
  updateReview(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto
  ): Promise<UpdateReviewDto> {
    return this.reviewsService.updateReview(id, updateReviewDto);
  }

  @Delete(":id")
  deleteReview(@Param("id", ParseIntPipe) id: number) {
    return this.reviewsService.deleteReview(id);
  }
}
