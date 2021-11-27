import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "../reviews/review.entity";
import { PostgresInterval } from "../commons/models/postgresInterval.model";

@Entity({ name: "films" })
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: "release_date" })
  releaseDate: Date;

  @Column({ type: "interval" })
  duration: PostgresInterval;

  @Column({ name: "average_rating" })
  averageRating: number;

  @OneToMany(() => Review, (review) => review.film)
  reviews: Review[];
}
