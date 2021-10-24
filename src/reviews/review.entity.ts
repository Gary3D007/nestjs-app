import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../films/film.entity";

@Entity({ name: "reviews" })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filmId: number;

  @ManyToOne(() => Film, (film) => film.reviews)
  film: Film;

  @Column()
  mark: number;

  @Column()
  header: string;

  @Column()
  body: string;

  @Column({ name: "publication_date" })
  publicationDate: Date;
}
