import { Director } from "../db/entities/director";
import { AppDataSource as db } from "../db/data-source";

export class DirectorService {
  static createNewDirector = (data: Director): Promise<Director> => {
    return db.getRepository(Director).save(data);
  };

  static findDirector = (id: number): Promise<Director | null> => {
    return db.getRepository(Director).findOneBy({ id });
  };

  static updateDirector = async (
    data: Partial<Director>
  ): Promise<Director | null> => {
    const repo = db.getRepository(Director);
    let director = await repo.findOneBy({ id: data.id });
    if (!director) {
      throw new Error(` Director with id ${data.id} to update does not exist!`);
    }
    director = { ...director, ...data };
    return repo.save(director);
  };

  static listDirectors = async (): Promise<Director[]> => {
    return db.getRepository(Director).find();
  };

  static deleteDirector = async (id: number): Promise<any> => {
    let result = await db.getRepository(Director).delete(id);
    return result.affected;
  };
}
