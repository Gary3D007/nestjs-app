import { SortDirection } from "../models/sortDirection.enum";
import { Type } from "@nestjs/common";

export class Helper {
  public static mapDtoKeysToEntityKeys<T>(
    dtoKeys: Map<string, SortDirection>,
    entityType: Type<T>
  ): Map<keyof T, SortDirection> {
    return new Map<keyof T, SortDirection>(
      Array.from(dtoKeys).reduce((accumulator, [key, sortDirection]) => {
        if (key in entityType) {
          accumulator.push([key, sortDirection]);
        }
        return accumulator;
      }, [])
    );
  }
}
