import React, { useEffect } from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Directors from "./pages/directors";
import Movies from "./pages/movies";
import AddMovies from "./pages/movies/add-movies";
import ListMovies from "./pages/movies/list-movies";
import { Link } from "react-router-dom";
import EditMovies from "./pages/movies/edit-movies";
import { useDispatch } from "react-redux";


import * as movieService from "./services";
import {  setStoreDirectors} from "./shared/store/director-slice";
import { AppDispatch } from "./shared/store/config";
import ViewMovies from "./pages/movies/view-movies";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    movieService.getDirectors().then((result) => {
      if (result.ok) {
        dispatch(setStoreDirectors(result.data));
      }
    });
  }, [dispatch]); // eslintreact-hooks/exhaustive-deps

  return (
    <AppContainer>
      <h1 className="app-title"> Movie Application</h1>
      <nav>
        <Link to={"/list"}> Movies</Link>
        <Link to={"/directors"}> Directors</Link>
      </nav>
      <div className="pages">
        <Routes>
          <Route element={<Movies />}>
            <Route index element={<ListMovies />} />
            <Route path="list" element={<ListMovies />} />
            <Route path="view/:id" element={<ViewMovies />} />
            <Route path="edit/:id" element={<EditMovies />} />
            <Route path="add" element={<AddMovies />} />
          </Route>
          <Route path="directors" element={<Directors />}></Route>
        </Routes>
      </div>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  margin: auto;
  border: 1px solid black;
  padding: 10px, 50px;
  max-width: 800px;
  min-width: 400px;
  .app-title {
    text-align: center;
    color: red;
  }
  nav {
    margin-left: 50px;
    a {
      margin-right: 20px;
      text-decoration: none;
      &:hover {
        color: red;
      }
    }
  }
  .pages {
    margin: 0 25px 50px 25px;
  }

  .active {
    color: red;
  }
`;

export default App;
