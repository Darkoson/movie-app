import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  deleteStoreDirector,
  selectStoreDirectors,
} from "../../shared/store/director-slice";
import { Director } from "../../shared/types";
import DirectorsForm from "./directors-form";
import ListDirectors from "./list-directors";
import * as movieService from "../../services";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../shared/store/config";
import {
  addStoreDirector,
  updateStoreDirector,
} from "../../shared/store/director-slice";

const Directors: FC = () => {
  const [currentDirector, setCurrentDirector] = useState<Director>({
    id: 0,
    first_name: "",
    last_name: "",
  });
  const [isCreateState, setIsCreateState] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const listDirectors = useSelector(selectStoreDirectors);

  const handleFormSubmission = (formData: Director) => {
    if (isCreateState) {
      let { first_name, last_name } = formData;
      movieService.postDirector({ first_name, last_name }).then((result) => {
        if (result.ok) {
          dispatch(addStoreDirector(result.data));
          initCurrentDirector();
          setIsCreateState(true);
        } else {
          console.log("Error = ", result);
        }
      });
    }

    // case of update of the director
    else {
      movieService.putDirector(formData).then((result) => {
        if (result.ok) {
          dispatch(updateStoreDirector(result.data));
          console.log(result.data);

          setIsCreateState(true);
          initCurrentDirector();
        } else {
          console.log("Error = ", result);
        }
      });
    }
  };

  const handleClickUpdate = (id: number) => {
    setIsCreateState(false);
    let director = listDirectors.find((director) => director.id === id);
    if (director) {
      setCurrentDirector(director);
    }
  };

  const handleClickDelete = (id: number) => {
    movieService.deleteDirector(id).then((result) => {
      if (result.ok) {
        dispatch(deleteStoreDirector(id));
      } else {
        console.log("Error = ", result);
      }
    });
  };

  const initCurrentDirector = () => {
    setCurrentDirector((prev) => ({ ...prev, first_name: "", last_name: "" }));
  };

  return (
    <Container>
      <h2 className="title"> Directors Management</h2>

      <DirectorsForm
        director={currentDirector}
        isCreate={isCreateState}
        onSubmit={handleFormSubmission}
      />

      <div className="directors">
        <ListDirectors
          directors={listDirectors}
          handleUpdate={handleClickUpdate}
          handleDelete={handleClickDelete}
        />
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
