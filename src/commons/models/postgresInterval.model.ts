import { IsInt, IsOptional, IsPositive, Max, Min } from "class-validator";

export class PostgresInterval {
  @IsInt()
  @IsPositive()
  @IsOptional()
  public hours: number;
  @IsInt()
  @Min(1)
  @Max(59)
  @IsOptional()
  public minutes: number;
  @IsInt()
  @Min(1)
  @Max(59)
  @IsOptional()
  public seconds: number;
}
