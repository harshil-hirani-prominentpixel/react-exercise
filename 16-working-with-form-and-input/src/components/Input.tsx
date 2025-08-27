import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, id, error, ...props }) => {
  return (
    <div className='control no-margin'>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div className='control-error'>{error && <p>{error}</p>}</div>
    </div>
  );
};

export default Input;
