import { useRef, useState } from "react";

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>(false);

  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = email.current?.value || "";
    const enteredPassword = password.current?.value || "";

    const emailIsValid = enteredEmail.includes("@");

    if (!emailIsValid) {
      setEmailIsInvalid(true);
      return;
    }

    setEmailIsInvalid(false);

    console.log("Sending HTTP request...");
    console.log("Email:", enteredEmail);
    console.log("Password:", enteredPassword);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' ref={email} />
          <div className='control-error'>
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' name='password' ref={password} />
        </div>
      </div>

      <p className='form-actions'>
        <button type='reset' className='button button-flat'>
          Reset
        </button>
        <button type='submit' className='button'>
          Login
        </button>
      </p>
    </form>
  );
}
