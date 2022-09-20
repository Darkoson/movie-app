import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as movieService from "../../services";
import { selectStoreMovies } from "../../shared/store/movie-slice";

const ViewMovies: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let movie = useSelector(selectStoreMovies).find(
    (m) => Number(m.id) === Number(id)
  );

  useEffect(() => {
    if (!movie) {
      movieService.getMovie(Number(id)).then((result) => {
        if (result.ok) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          movie = result.data;
        }
      });
    }
  }, [movie, id]);

  return (
    <Container>
      <h3> Movie Details</h3>

      {movie ? (
        <div className="details">
          <div className="movie-details">
            <span>Name:</span>
            <em> {movie.name}</em>
            <span>Release Year:</span>
            <em> {movie.release_year}</em>
          </div>
          <h5>Director Details:</h5>
          <div className="director-details">
            <span>First name:</span>
            <em>{movie.director.first_name} </em>
            <span>Last Name:</span>
            <em>{movie.director.last_name} </em>
          </div>
        </div>
      ) : (
        <div className="empty"> Movie not found </div>
      )}

      <div className="buttons">
        <button className="list" onClick={() => navigate("/list")}>
          Back to List
        </button>
        <button className="edit" onClick={() => navigate("/edit/" + movie?.id)}>
          Edit
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  .details {
    width: 100%;
    border: 1px solid black;
    padding: 1em;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .movie-details,
    .director-details {
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 1.5rem;
    }
  }
  .buttons {
    margin-top: 2rem;
    &:hover {
      cursor: pointer;
    }
    .list {
      &:hover {
        cursor: pointer;
      }
    }
    .edit {
      margin-left: 3rem;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export default ViewMovies;
