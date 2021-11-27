import { OmitType } from "@nestjs/mapped-types";
import { ReviewDto } from "./review.dto";

export class CreateReviewDto extends OmitType(ReviewDto, ["id"] as const) {}
