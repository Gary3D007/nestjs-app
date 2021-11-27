import { ReviewsService } from "./services/reviews.service";
import {
  Body,
  Controller,
  Delete,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import { CreateReviewDto } from "./dto/createReview.dto";
import { UpdateReviewDto } from "./dto/updateReview.dto";
import { ReviewDto } from "./dto/review.dto";
import { JwtAuthGuard } from "../auth/guards/jwtAuth.guard";
import { AuthService } from "../auth/auth.service";

@Controller("reviews")
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly authService: AuthService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @Headers("Authorization") token: string
  ): Promise<ReviewDto> {
    const user = await this.authService.getUserFromToken(token);
    return await this.reviewsService.addReview(createReviewDto, user);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updateReview(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @Headers("Authorization") token: string
  ): Promise<UpdateReviewDto> {
    const user = await this.authService.getUserFromToken(token);
    return this.reviewsService.updateReview(id, updateReviewDto, user);
  }

  @Delete(":id")
  async deleteReview(
    @Param("id", ParseIntPipe) id: number,
    @Headers("Authorization") token: string
  ): Promise<ReviewDto> {
    const user = await this.authService.getUserFromToken(token);
    return this.reviewsService.deleteReview(id, user);
  }
}
