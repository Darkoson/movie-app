import React, { FC, FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import * as movieService from "../../services";
import useForm from "../../shared/hooks/useForm";
import { AppDispatch } from "../../shared/store/config";
import {
  selectStoreMovies,
  updateStoreMovie,
} from "../../shared/store/slices/movie-slice";
import { MovieUpdateInput } from "../../shared/types";

const EditMovies: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { inputs, setFieldAndValue, handleInputChange, handleSelectChange } =
    useForm();

  let movie = useSelector(selectStoreMovies).find(
    (movie) => Number(movie.id) === Number(id)
  );

  useEffect(() => {
    setFieldAndValue("name", movie?.name);
    setFieldAndValue("year", movie?.release_year);
    setFieldAndValue("director", movie?.director.id);
  }, [movie]);

  const getFormData = (): MovieUpdateInput => {
    const { name, year, director } = inputs;
    return {
      id: Number(id),
      name,
      director,
      release_year: year,
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
    const { name, year, director } = inputs;
    if (!name || !year || !director) {
      return false;
    }
    return true;
  };

  return (
    <Container>
      <h3> Edit movie</h3>

      <form className="add-movie form" onSubmit={onSubmit}>
        <div className="form-goup">
          <label htmlFor="name"> Movie name: </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={movie?.name}
            placeholder="Title of the movie"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-goup">
          <label htmlFor="year"> Year of Release: </label>
          <input
            type="number"
            name="year"
            defaultValue={movie?.release_year}
            id="year"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-goup">
          <label htmlFor="director">Director: </label>
          <select
            id="director"
            placeholder=""
            name="director"
            defaultValue={movie?.director.id}
            onChange={handleSelectChange}>
            <option value="3">Thomas Darko</option>
            <option value="4">Emmanuel Darko</option>
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
