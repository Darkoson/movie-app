import { Director } from "../db/entities/director";
import { Movie } from "../db/entities/movie";
import { AppDataSource as db } from "../db/data-source";
import { DirectorService } from "./director-service";

export class MovieService {
  static findMovie = (id: number): Promise<Movie | null> => {
    return db.getRepository(Movie).findOne({
      where: { id: id },
      relations: {
        director: true,
      },
    });
  };

  static createMovie = async (data: Movie): Promise<Movie> => {
    try {
      if (typeof data.director == "number") {
        let director = await db
          .getRepository(Director)
          .findOneBy({ id: data.director });

        if (!director) {
          throw new Error(`Director not found !`);
        }
        data.director = director;
      } else {
        let director = await DirectorService.createNewDirector(data.director);
        data.director = director;
      }

      return db.getRepository(Movie).save(data);
    } catch (err) {
      throw err;
    }
  };

  static updateMovie = async (newUpdate: Movie): Promise<Movie | null> => {
    const movieRepo = db.getRepository(Movie);
    let oldMovie = await movieRepo.findOneBy({ id: newUpdate.id });
    console.log("new der=", oldMovie);
    if (!oldMovie) {
      throw new Error(`The movie with id ${newUpdate.id} does not exist!`);
    }

    let directorId = Number(newUpdate.director);
    let newDirector = await DirectorService.findDirector(directorId);
    if (!newDirector) {
      throw new Error(
        `New Director with id ${newUpdate.director} does not exist!`
      );
    }

    console.log("new der=", newDirector);
    delete newUpdate.director;
    oldMovie = { ...oldMovie, ...newUpdate };
    oldMovie.director = newDirector;

    // let directorRepo = db.getRepository(Director);

    // newDirector.movies.push(oldMovie);

    // directorRepo.save(newDirector);
    movieRepo.update(newUpdate.id, oldMovie);
    //movieRepo.save(oldMovie);

    return MovieService.findMovie(newUpdate.id);
  };

  static listMoviesWithDitector = async (): Promise<Movie[]> => {
    const movies = await db.getRepository(Movie).find({
      relations: {
        director: true,
      },
    });
    return movies;
  };

  static listMovies = async (): Promise<Movie[]> => {
    const movies = await db.getRepository(Movie).find({
      relations: {
        director: true,
      },
    });
    return movies;
  };

  static listMoviesOfDirector = async (
    directorId: number
  ): Promise<Movie[]> => {
    let director = await db
      .getRepository(Director)
      .findOneBy({ id: directorId });

    return director ? director.movies : [];
  };

  static deleteMovie = async (id: number): Promise<any> => {
    let result = await db.getRepository(Movie).delete(id);
    return result.affected;
  };
}
