import { Request, Response } from "express";
import { Movie } from "../db/entities/movie";
import { MovieService } from "../services/movie-service";
import { ApiResult, IMovieInput } from "../types";

export const postMovie = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };

  const data = req.body as Movie;
  data.director = Number(data.director);
try {
  result.data = await MovieService.createMovie(data);
  
} catch (error) {
  result.ok = false;
  result.message = error.message || error
}

  return res.status(200).send(result);
};

export const getMovie = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let id = Number(req.params.id);
  result.data = await MovieService.findMovie(id);

  return res.status(200).send(result);
};

export const getAllMovies = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let id = Number(req.params.id);
  result.data = await MovieService.listMoviesWithDitector();
  return res.status(200).send(result);
};

export const updateMovie = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };

  let data = req.body as Movie;
  console.log("date=", data);
  result.data = await MovieService.updateMovie(data);

  return res.status(200).send(result);
};

export const deleteMovie = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let id = Number(req.params.id);
  result.data = await MovieService.deleteMovie(id);

  return res.status(200).send(result);
};
