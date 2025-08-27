import React from "react";

const BasicForm = () => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className='form-control'>
          <label htmlFor='firstName'>First Name</label>
          <input type='text' id='firstName' />
        </div>
        <div className='form-control'>
          <label htmlFor='lastName'>Last Name</label>
          <input type='text' id='lastName' />
        </div>
      </div>
      <div className='form-control'>
        <label htmlFor='email'>E-Mail Address</label>
        <input type='email' id='email' />
      </div>
      <div className='form-actions'>
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
