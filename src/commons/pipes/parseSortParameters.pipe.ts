import {
  BadRequestException,
  Injectable,
  PipeTransform,
  Type
} from "@nestjs/common";
import { SortDirection } from "../models/sortDirection.enum";
import { Sortable } from "../models/sortable";

@Injectable()
export class ParseSortParametersPipe<T extends Sortable<T>>
  implements PipeTransform<string[], Map<keyof T, SortDirection>>
{
  constructor(private readonly entityType: Type<T>) {}

  transform(value: string[]): Map<keyof T, SortDirection> {
    const result: Map<keyof T, SortDirection> = new Map();
    console.log("Array:", value);
    value.forEach((pair) => {
      const [key, value] = pair.split(":", 2) as [keyof T, string];

      const entity: T = new this.entityType();
      if (!entity.getSortByFields().includes(key)) {
        throw new BadRequestException(`Can't sort by '${key}'`);
      }

      if (value && !(value.toUpperCase() in SortDirection)) {
        throw new BadRequestException(
          `Sort direction can be only '${SortDirection.ASC}' or '${SortDirection.DESC}'`
        );
      }

      result.set(key, SortDirection[value] || SortDirection.ASC);
    });

    return result;
  }
}
