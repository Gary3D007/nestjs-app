import { IPostgresInterval } from "postgres-interval";

export class CreateFilmDto {
  name: string;
  description: string;
  releaseDate: Date;
  duration: IPostgresInterval;
}
