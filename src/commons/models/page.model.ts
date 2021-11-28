export class Page<T> {
  public list: T[];
  public paginationInformation: PaginationInformation;

  constructor(list: T[], paginationInformation: PaginationInformation) {
    this.list = list;
    this.paginationInformation = paginationInformation;
  }

  public static of<T>(
    list: T[],
    pageNumber: number,
    pageSize: number,
    totalRecords: number
  ): Page<T> {
    const paginationInformation = new PaginationInformation(
      pageNumber,
      pageSize,
      totalRecords
    );
    return new Page<T>(list, paginationInformation);
  }

  public map<R>(mappingFunction: (entity: T) => R): Page<R> {
    return new Page(this.list.map(mappingFunction), this.paginationInformation);
  }
}

export class PaginationInformation {
  constructor(
    public pageNumber: number,
    public pageSize: number,
    public totalRecords: number
  ) {}
}
