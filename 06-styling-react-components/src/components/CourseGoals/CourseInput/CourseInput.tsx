import React, { useState, type ChangeEvent, type FormEvent } from "react";

import Button from "../../UI/Button/Button";
import "./CourseInput.css";

const CourseInput: React.FC<{ onAddGoal: (text: string) => void }> = (
  props
) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = (event: ChangeEvent) => {
    setIsValid(true);
    setEnteredValue((event.target as HTMLInputElement).value);
  };

  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`form-control ${!isValid && "invalid"}`}>
        <label>Course Goal</label>
        <input type='text' onChange={goalInputChangeHandler} />
      </div>
      <Button type='submit'>Add Goal</Button>
    </form>
  );
};

export default CourseInput;
