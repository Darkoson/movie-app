import React, { FC, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { log } from "util";
import useForm from "../../shared/hooks/useForm";
import { Director } from "../../shared/types";

type DirectorsFormProps = {
  director: Director;
  isCreate: boolean;
  onSubmit: (data: Director) => void;
};

const DirectorsForm: FC<DirectorsFormProps> = (props) => {
  let director: Director = props.director;

  const { inputs, handleInputChange, setFieldAndValue } = useForm();
  let { first_name, last_name } = inputs;

  useEffect(() => {
    setFieldAndValue("first_name", props.director.first_name);
    setFieldAndValue("last_name", props.director.last_name);
    console.log("for effect director =", props.director);
  }, [props.director]);

  useEffect(() => {
    setFieldAndValue("first_name", props.director.first_name);
    setFieldAndValue("last_name", props.director.last_name);
    console.log("for effect director =", props.director);
  }, []);

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (first_name && last_name) {
      let data = { ...director, first_name, last_name };
      props.onSubmit(data);
      setFieldAndValue("first_name", "");
      setFieldAndValue("last_name", "");
      console.log("input", inputs);
      console.log("data to submit", data);
    } else {
      console.log("Form not valid");
    }
  };

  return (
    <Container>
      <form onSubmit={handleForm} className="form">
        <div className="test">{last_name}</div>
        <div className="form-goup">
          <label htmlFor="first_name"> First name: </label>

          <input
            type="text"
            id="first_name"
            name="first_name"
            defaultValue={first_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-goup">
          <label htmlFor="last_name"> Last name: </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            defaultValue={last_name}
            onChange={handleInputChange}
          />
        </div>

        <button onClick={() => {}}>
          {props.isCreate ? "Create " : "Save Update"}
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
