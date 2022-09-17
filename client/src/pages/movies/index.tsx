import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { AppDispatch } from "../../shared/store/config";
import * as movieService from "../../services";
import { setStoreMovies } from "../../shared/store/movie-slice";

const Movies: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    movieService.getMovies().then((result) => {
      if (result.ok) {
        dispatch(setStoreMovies(result.data));
      }
    });
  }, [dispatch]);

  return (
    <Container>
      <h1 className="title"> movies Management</h1>
      <Outlet />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
`;

export default Movies;
