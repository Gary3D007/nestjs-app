import { EntityNotFoundError, Repository, TypeORMError } from "typeorm";
import { ObjectLiteral } from "typeorm/common/ObjectLiteral";
import { Page } from "./models/page.model";
import { Type } from "@nestjs/common";

export abstract class AbstractCrudRepository<
  T extends ObjectLiteral
> extends Repository<T> {
  protected constructor(protected readonly entityType: Type<T>) {
    super();
  }

  async findAllPaginated(pageNumber, pageSize): Promise<Page<T>> {
    const [list, totalRecords] = await this.findAndCount({
      skip: pageNumber - 1,
      take: pageSize
    });

    return Page.of(list, pageNumber, pageSize, totalRecords);
  }

  async updateAndReturnUpdated(
    id: number,
    updatedEntity: T
  ): Promise<T | null> {
    return this.findAndExecuteAction(
      () => this.preload({ id, ...updatedEntity }),
      (entity) => this.save(entity),
      () => this.getNotFoundException(id)
    );
  }

  async deleteAndReturnDeleted(id: number): Promise<T | null> {
    return this.findAndExecuteAction(
      () => this.findOne(id),
      (entity) => this.remove(entity),
      () => this.getNotFoundException(id)
    );
  }

  protected async findAndExecuteAction(
    findFunction: () => Promise<T>,
    actionFunction: (entity: T) => Promise<T>,
    notFoundProvider?: () => Error
  ): Promise<T | null> {
    let foundEntity: T = null;

    try {
      foundEntity = await findFunction();

      if (!foundEntity) {
        console.warn("Can't find entity to perform action on");
        if (!!notFoundProvider) {
          throw notFoundProvider();
        }
        return null;
      }

      console.log("Trying to perform action on:", foundEntity);
      await actionFunction(foundEntity);
    } catch (err) {
      console.error("findAndExecuteAction failed:", err);
      if (err instanceof TypeORMError) {
        throw err;
      }
    }

    return foundEntity;
  }

  protected getNotFoundException(id: string | number): EntityNotFoundError {
    return new EntityNotFoundError(this.entityType, id);
  }
}
