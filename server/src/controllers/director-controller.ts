import { Request, Response } from "express";
import { ApiResult} from "../types";
import { DirectorService } from "../services/director-service";
import { Director } from "../db/entities/director";

export const postDirector = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let data = req.body as Director;
  console.log("data", data);

  result.data = await DirectorService.createNewDirector(data);
  console.log("res=", result);
  if (!result.data) {
    result.ok = false;
  }

  return res.status(200).send(result);
};

export const getDirector = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let id = Number(req.params.id);
  result.data = await DirectorService.findDirector(id);

  return res.status(200).send(result);
};

export const getAllDirectors = async (
  req: Request,
  res: Response<ApiResult>
) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let id = Number(req.params.id);
  result.data = await DirectorService.listDirectors();

  return res.status(200).send(result);
};

export const updateDirector = async (req: Request, res: Response<ApiResult>) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let data = req.body as Director
  result.data = await DirectorService.updateDirector(data);

  return res.status(200).send(result);
};

export const deleteDirector = async (
  req: Request,
  res: Response<ApiResult>
) => {
  let result: ApiResult = { ok: true, data: null, message: "" };
  let id = Number(req.params.id);
  result.data = await DirectorService.deleteDirector(id);

  return res.status(200).send(result);
};
