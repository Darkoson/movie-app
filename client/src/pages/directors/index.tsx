import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectStoreDirectors,
  setStoreDirectors,
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

  useEffect(() => {}, []);

  useEffect(() => {
    movieService.getDirectors().then((result) => {
      if (result.ok) {
        dispatch(setStoreDirectors(result.data));
      }
    });
  }, [dispatch]);

  const handleFormSubmission = (formData: Director) => {
    if (isCreateState) {
      let { first_name, last_name } = formData;
      movieService.postDirector({ first_name, last_name }).then((result) => {
        if (result.ok) {
          dispatch(addStoreDirector(result.data));
          initCurrentDirector();
        } else {
          console.log("Error = ", result);
        }
      });
    }

    // case of update of the director
    else {
      movieService.putDirector(currentDirector).then((result) => {
        if (result.ok) {
          dispatch(updateStoreDirector(result.data));
          setIsCreateState(false);
          initCurrentDirector();
        } else {
          console.log("Error = ", result);
        }
      });
    }
  };

  const handleUpdate = (id: number) => {
    let director = listDirectors.find((director) => director.id === id);
    if (director) {
      setCurrentDirector(director);
    }
  };

  const handleDelete = (id: number) => {};

  const initCurrentDirector = () => {
    setCurrentDirector((prev) => ({ ...prev, first_name: "", last_name: "" }));
  };

  return (
    <Container>
      <h1 className="title"> Directors Management</h1>

      <DirectorsForm
        director={currentDirector}
        isCreate={isCreateState}
        onSubmit={handleFormSubmission}
      />

      <div className="directors">
        <ListDirectors
          directors={listDirectors}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
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
