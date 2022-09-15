import React, { FC, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as movieService from "../../services";
import useForm from "../../shared/hooks/useForm";
import { AppDispatch } from "../../shared/store/config";
import { addStoreMovie } from "../../shared/store/slices/movie-slice";
import { MovieInput } from "../../shared/types";

const AddMovies: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { inputs, handleInputChange, handleSelectChange } = useForm();

  const getFormData = (): MovieInput => {
    const { name, year, director } = inputs;
    return {
      name,
      director,
      release_year: year,
    };
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidation()) {
      let data = getFormData();

      movieService.postMovie(data).then((result) => {
        if (result.ok) {
          dispatch(addStoreMovie(result.data));
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
      <h3> Create a new movie</h3>

      <form className="add-movie form" onSubmit={onSubmit}>
        <div className="form-goup">
          <label htmlFor="name"> Movie name: </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Title of the movie"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-goup">
          <label htmlFor="year"> Year of Release: </label>
          <input
            type="number"
            name="year"
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
            onChange={handleSelectChange}>
            <option value="3">Thomas Darko</option>
            <option value="4">Emmanuel Darko</option>
          </select>
        </div>

        <button> Create Movie </button>
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

export default AddMovies;
