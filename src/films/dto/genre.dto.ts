import { IsNotBlank } from "../../commons/validation/validators";
import { Sortable } from "../../commons/models/sortable";

export class GenreDto implements Sortable<GenreDto> {
  id: number;
  @IsNotBlank()
  name: string;

  getSortByFields(): Array<keyof GenreDto> {
    return ["name"];
  }
}
