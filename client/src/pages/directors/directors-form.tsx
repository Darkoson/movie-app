import React, { FC, FormEvent, useEffect, useRef } from "react";
import styled from "styled-components";
import { Director } from "../../shared/types";

type DirectorsFormProps = {
  director: Director;
  isCreate: boolean;
  onSubmit: (data: Director) => void;
};

const DirectorsForm: FC<DirectorsFormProps> = (props) => {
  let director: Director = props.director;
  const fnameEl = useRef() as React.MutableRefObject<HTMLInputElement>;
  const lnameEl = useRef() as React.MutableRefObject<HTMLInputElement>;

  const initForm = (fname: string, lname: string): void => {
    fnameEl.current.value = fname;
    lnameEl.current.value = lname;
  };

  // const { inputs, handleInputChange, setFieldAndValue } = useForm();
  // let { first_name, last_name } = inputs;

  useEffect(() => {
    initForm(props.director.first_name, props.director.last_name);
  }, [props.director]);

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let first_name = fnameEl.current.value;
    let last_name = lnameEl.current.value;

    if (first_name && last_name) {
      let data = { ...director, first_name, last_name };
      props.onSubmit(data);
      initForm("", "");
      console.log("data to submit", data);
    } else {
      console.log("Form not valid");
    }
  };

  return (
    <Container>
      <form onSubmit={handleForm} className="form">
        <div className="form-goup">
          <label htmlFor="first_name"> First name: </label>

          <input type="text" id="first_name" name="first_name" ref={fnameEl} />
        </div>

        <div className="form-goup">
          <label htmlFor="last_name"> Last name: </label>
          <input type="text" name="last_name" id="last_name" ref={lnameEl} />
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
