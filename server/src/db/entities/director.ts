import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movie";

@Entity() 
export class Director  {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column("varchar", { nullable: false })
  first_name: string;

  @Column("varchar", { nullable: false })
  last_name: string;

  @OneToMany(() => Movie, (movie) => movie.director, {cascade:true})
  movies: Movie[];
}
