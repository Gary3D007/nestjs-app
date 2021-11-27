import { IsInt, IsPositive, Max, Min, ValidateIf } from "class-validator";

export class PostgresInterval {
  @IsInt()
  @IsPositive()
  @ValidateIf((o) => o.hours != null)
  public readonly hours: number;
  @IsInt()
  @Min(1)
  @Max(59)
  @ValidateIf((o) => o.minutes != null)
  public readonly minutes: number;
  @IsInt()
  @Min(1)
  @Max(59)
  @ValidateIf((o) => o.seconds != null)
  public readonly seconds: number;
}
