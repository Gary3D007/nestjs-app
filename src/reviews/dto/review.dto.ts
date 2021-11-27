import { IsInt, IsPositive, Max, Min } from "class-validator";
import { IsNotBlank } from "../../commons/validation/validators";

export class ReviewDto {
  id: number;
  @IsPositive()
  @IsInt()
  filmId: number;
  @IsInt()
  @Min(0)
  @Max(100)
  mark: number;
  @IsNotBlank()
  header: string;
  @IsNotBlank()
  body: string;
}
