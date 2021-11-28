import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "./film.entity";

@Entity({ name: "genres" })
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Film, (film) => film.genres)
  films: Film[];
}
