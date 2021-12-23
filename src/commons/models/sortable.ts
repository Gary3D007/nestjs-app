export interface Sortable<T> {
  getSortByFields(): Array<keyof T>;
}
