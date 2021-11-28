import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../films/model/film.entity";
import { User } from "../users/user.entity";

@Entity({ name: "reviews" })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filmId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Film, (film) => film.reviews, { onDelete: "CASCADE" })
  film: Film;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @Column()
  mark: number;

  @Column()
  header: string;

  @Column()
  body: string;

  @Column({ name: "publication_date" })
  publicationDate: Date;
}
