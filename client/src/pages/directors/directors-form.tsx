import React, { FC, FormEvent } from "react";
import styled from "styled-components";
import useForm from "../../shared/hooks/useForm";
import { Director } from "../../shared/types";

type DirectorsFormProps = {
  director: Director;
  isCreate: boolean;
  onSubmit: (data: Director) => void;
};

const DirectorsForm: FC<DirectorsFormProps> = (props) => {
  let director: Director = { id: 0, first_name: "", last_name: "" };

  const { inputs, handleInputChange } = useForm();

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { first_name, last_name } = inputs;
    if (first_name && last_name) {
      director.first_name = first_name;
      director.last_name = last_name;
      props.onSubmit(director);
    } else {
      console.log("Form not valid");
    }
  };

  return (
    <Container>
      <form onSubmit={handleForm} className="form">
        <div className="form-goup">
          <label htmlFor="first_name"> First name: </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            defaultValue={director.first_name}
            onChange={handleInputChange}
            placeholder="Title of the movie"
          />
        </div>

        <div className="form-goup">
          <label htmlFor="last_name"> Last name: </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            defaultValue={director.last_name}
            onChange={handleInputChange}
          />
        </div>

        <button onClick={() => {}}>
          {props.isCreate ? "Create " : "Save "}
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;

  .form {
    width: 80%;
    border: 1px solid black;
    padding: 1rem;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;

export default DirectorsForm;
