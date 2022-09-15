import {
  ApiResult,
  Director,
  DirectorInput,
  Movie,
  MovieInput,
  MovieUpdateInput,
} from "../shared/types";
import api from "./api";

const errorResponse: ApiResult = {
  ok: false,
  message: "an error has occurred",
  data: null,
};

export const postMovie = async (
  data: MovieInput
): Promise<ApiResult<Movie>> => {
  try {
    let response = await api.post<Movie>("movies", data);
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};

export const getMovie = async (id: number): Promise<ApiResult<Movie>> => {
  try {
    let response = await api.get<Movie>("movies/" + id);
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};
export const getMovies = async (): Promise<ApiResult<Movie[]>> => {
  try {
    let response = await api.get<Movie[]>("movies");
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};

export const putMovie = async (
  data: MovieUpdateInput
): Promise<ApiResult<Movie>> => {
  try {
    let response = await api.put<Movie>("movies/" + data.id, data);
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};

export const deleteMovie = async (id: number): Promise<ApiResult> => {
  try {
    let response = await api.del<ApiResult<Movie>>("movies/" + id);
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};

// directors requests
export const postDirector = async (
  data: DirectorInput
): Promise<ApiResult<Director>> => {
  try {
    let response = await api.post<Director>("Directors", data);
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};

export const getDirector = async (id: number): Promise<ApiResult<Director>> => {
  try {
    let response = await api.get<Director>("directors/" + id);
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};
export const getDirectors = async (): Promise<ApiResult<Director[]>> => {
  try {
    let response = await api.get<Director[]>("directors");
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};

export const putDirector = async (
  data: Director
): Promise<ApiResult<Director>> => {
  try {
    let response = await api.put<Director>("directors/" + data.id, data);
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};

export const deleteDirector = async (id: number): Promise<ApiResult> => {
  try {
    let response = await api.del<ApiResult<Director>>("directors/" + id);
    return response.data;
  } catch (err: any) {
    errorResponse.message = err.message;
    return errorResponse;
  }
};
 