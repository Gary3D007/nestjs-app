import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Review } from "../../reviews/review.entity";
import { PostgresInterval } from "../../commons/models/postgresInterval.model";
import { Genre } from "./genre.entity";

@Entity({ name: "films" })
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: "release_date", type: "date" })
  releaseDate: string;

  @Column({ type: "interval" })
  duration: PostgresInterval;

  @Column({ name: "average_rating" })
  averageRating: number;

  @OneToMany(() => Review, (review) => review.film)
  reviews: Review[];

  @ManyToMany(() => Genre, (genre) => genre.films)
  @JoinTable()
  genres: Genre[];
}
