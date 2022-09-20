import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as movieService from "../../services";
import { AppDispatch } from "../../shared/store/config";
import {
  deleteStoreMovie,
  selectStoreMovies,
} from "../../shared/store/movie-slice";
import { Movie } from "../../shared/types";

const ListMovies: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  let movieList = useSelector(selectStoreMovies);

  const handleDelete = (id: number) => {
    movieService.deleteMovie(id).then((result) => {
      if (result.ok) {
        dispatch(deleteStoreMovie(id));
      }
    });
  };

  useEffect(() => {}, [movieList]);

  return (
    <Container>
      <button
        onClick={() => {
          navigate("/add");
        }}>
        Create Movie
      </button>

      <h3> List of movies | {movieList.length}</h3>
      <div className="list">
        <div className="row">
          <span> Movie Name</span>
          <span> Year of release</span>
          <span> Actions</span>
        </div>

        {movieList.length > 0 ? (
          movieList.map((movie: Movie) => (
            <div className="row" key={movie.id}>
              <Link to={"/view/" + movie.id}> {movie.name}</Link>
              <div> {movie.release_year}</div>
              <div>
                <span
                  className="update"
                  onClick={() => {
                    navigate("/edit/" + movie.id);
                  }}>
                  update
                </span>
                <span className="delete" onClick={() => handleDelete(movie.id)}>
                  {" "}
                  delete{" "}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty"> No movie ! </div>
        )}
      </div>

     
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  button {
    max-width: 200px;
    right: 20px;
    position: absolute;
    padding: 10px;
    border-radius: 10px;
    align-self: flex-end;
    border: none;
    &:hover {
      cursor: pointer;
      background-color: red;
      color: white;
    }
  }
  .list {
    margin-top: 50px;
    width: 100%;

    .row {
      display: grid;
      grid-template-columns: 3fr 1fr 150px;
      margin-top: 10px;
      padding-bottom: 10px;
      border-bottom: 0.5px dashed gray;

      .update {
        color: blue;
        &:hover {
          cursor: pointer;
        }
      }
      .delete {
        color: red;
        margin-left: 30px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    span {
      font-weight: bold;
    }
  }
  .empty {
    text-align: center;
  }
`;

export default ListMovies;
