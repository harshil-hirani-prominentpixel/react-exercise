import React, { forwardRef } from "react";
import classes from "./Input.module.css";

type InputProps = {
  label: string;
  input: React.InputHTMLAttributes<HTMLInputElement>;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
