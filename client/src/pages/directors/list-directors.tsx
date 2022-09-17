import React, { FC } from "react";
import styled from "styled-components";
import { Director } from "../../shared/types";

type ListDirectorsProps = {
  directors: Director[];
  handleUpdate: (id: number) => void;
  handleDelete: (id: number) => void;
};
const ListDirectors: FC<ListDirectorsProps> = (props) => {
  return (
    <Container>
      <h3> List of directors | {props.directors.length}</h3>
      <div className="list">
        <div className="row">
          <span> First Name</span>
          <span> Last Name</span>
          <span> Total Movies</span>
          <span> Actions</span>
        </div>

        {props.directors.length > 0 ? (
          props.directors.map((director: Director) => (
            <div className="row" key={director.id}>
              <div>{director.first_name}</div>
              <div> {director.last_name}</div>
              <div>{director.first_name}</div>
              <div>
                <span
                  className="update"
                  onClick={() => {
                    props.handleUpdate(director.id);
                  }}>
                  update
                </span>
                <span
                  className="delete"
                  onClick={() => props.handleDelete(director.id)}>
                  {" "}
                  delete{" "}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty"> No director ! </div>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .empty {
    text-align: center;
  }
`;

export default ListDirectors;
