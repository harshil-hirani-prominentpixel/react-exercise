import {type FormEvent } from "react";

function SimpleInput() {
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' />
      </div>
      <div className='form-actions'>
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
}

export default SimpleInput;
