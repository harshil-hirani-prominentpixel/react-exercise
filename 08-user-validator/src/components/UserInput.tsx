import React, { useState, type ChangeEvent, type FormEvent } from "react";
import validator from "../utils/validator";

import "./UserInput.css";

interface data {
  name: string;
  age: string;
}

const UserInput: React.FC<{
  onData: (data: data) => void;
  onError: (message: string) => void;
}> = ({ onData, onError }) => {
  const [data, setData] = useState({ name: "", age: "" });

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const result = validator(data.name, data.age);
    if (!result.result) {
      onError(result.message!);
      return;
    }
    onData(data);
    setData({ name: "", age: "" });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputId = (e.target as HTMLInputElement).id;
    const value = (e.target as HTMLInputElement).value;

    setData((prev) => {
      return { ...prev, [inputId]: value };
    });
  };

  return (
    <form className="my-form" onSubmit={onSubmitHandler}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        value={data.name}
        onChange={onChangeHandler}
        placeholder="Enter your name"
      />

      <label htmlFor="age">age</label>
      <input
        type="number"
        id="age"
        value={data.age}
        onChange={onChangeHandler}
        placeholder="Enter your age"
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserInput;
