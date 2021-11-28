import { IsNotBlank } from "../../commons/validation/validators";

export class GenreDto {
  id: number;
  @IsNotBlank()
  name: string;
}
