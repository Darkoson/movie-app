import React, { FC } from "react";
import styled from "styled-components";

const Directors: FC = () => {
  return (
    <Container>
      <h1 className="title"> Directors Management</h1>

      <div className="directors">
        <button onClick={() => {}}>Create Movie</button>

        <h3> List of movies </h3>
        <div className="list">
          <div className="row">
            <span> Movie Name</span>
            <span> Year of release</span>
            <span> Director</span>
            <span> Actions</span>
          </div>

          {/* {movieList.length > 0 ? (
          movieList.map((movie) => (
            <div className="row" key={movie.id}>
              <div>{movie.name}</div>
              <div> {movie.release_year}</div>
              <div>
                {movie.director.first_name} {movie.director.last_name}
              </div>
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
          <div className=""> No movie ! </div>
        )} */}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
`;

export default Directors;
