import React, { FC, FormEvent, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import * as movieService from "../../services";
import { AppDispatch } from "../../shared/store/config";
import { selectStoreDirectors } from "../../shared/store/director-slice";
import {
  selectStoreMovies,
  updateStoreMovie,
} from "../../shared/store/movie-slice";
import { Director, MovieUpdateInput } from "../../shared/types";

const EditMovies: FC = () => {
  const nameEl = useRef() as React.MutableRefObject<HTMLInputElement>;
  const yearEl = useRef() as React.MutableRefObject<HTMLInputElement>;
  const directorEl = useRef() as React.MutableRefObject<HTMLSelectElement>;
  let directors: Director[] = useSelector(selectStoreDirectors);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();

  let movie = useSelector(selectStoreMovies).find(
    (m) => Number(m.id) === Number(id)
  );

  const initForm = (name: string, year: string): void => {
    nameEl.current.value = name;
    yearEl.current.value = year;
  };

  const getFormData = (): MovieUpdateInput => {
    return {
      id: Number(id),
      name: nameEl.current.value,
      director: Number(directorEl.current.value),
      release_year: Number(yearEl.current.value),
    };
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(getFormData());

    if (handleValidation()) {
      let data = getFormData();

      movieService.putMovie(data).then((result) => {
        if (result.ok) {
          dispatch(updateStoreMovie(result.data));
          navigate("/");
        } else {
          console.log("Error = ", result);
        }
      });
    } else {
      console.log("not valid");
    }
  };

  const handleValidation = () => {
    const { name, release_year, director } = getFormData();
    if (!name || !release_year || !director) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (movie) {
      initForm(movie.name, movie.release_year + "");
    }
  }, [movie]);

  return (
    <Container>
      <h3> Edit movie</h3>

      <form className="add-movie form" onSubmit={onSubmit}>
        <div className="form-goup">
          <label htmlFor="name"> Movie name: </label>
          <input ref={nameEl} type="text" placeholder="Title of the movie" />
        </div>

        <div className="form-goup">
          <label htmlFor="year"> Year of Release: </label>
          <input ref={yearEl} type="number" name="year" />
        </div>

        <div className="form-goup">
          <label htmlFor="director">Director: </label>
          <select
            id="director"
            defaultValue={movie?.director?.id}
            ref={directorEl}>
            {directors &&
              directors.length > 0 &&
              directors.map((director) => (
                <option key={director.id} value={director.id}>
                  {director.first_name + " " + director.last_name}
                </option>
              ))}
          </select>
        </div>

        <button> update Movie </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  .form {
    width: 100%;
    border: 1px solid black;
    padding: 1em;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .form-goup {
      display: grid;
      grid-template-columns: 150px 1fr;
    }
  }
`;

export default EditMovies;
