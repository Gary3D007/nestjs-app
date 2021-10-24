import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IPostgresInterval } from "postgres-interval";
import { Review } from "../reviews/review.entity";

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
  duration: IPostgresInterval;

  @Column({ name: "average_rating" })
  averageRating: number;

  @OneToMany(() => Review, (review) => review.film)
  reviews: Review[];
}
