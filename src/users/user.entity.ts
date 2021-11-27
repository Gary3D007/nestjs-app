import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "../reviews/review.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
