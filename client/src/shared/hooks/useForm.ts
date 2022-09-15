import { useState } from "react";

const useForm = () => {
  const [inputs, setInputs] = useState<{ [key: string]: any }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  const setFieldAndValue = (fieldName: string, value: any) => {
    setInputs((inputs) => ({
      ...inputs,
      [fieldName]: value,
    }));
  };

  return {
    handleInputChange,
    handleSelectChange,
    setFieldAndValue,
    inputs,
  };
};

export default useForm;
