import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Director } from "./director";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column("varchar", { nullable: false })
  name: string;

  @Column("integer", { nullable: false })
  release_year: number;

  @ManyToOne(() => Director, (director) => director.movies, {
    onDelete: "CASCADE",
  })
  director: Director | number;
}
