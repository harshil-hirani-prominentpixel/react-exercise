import type { FormEvent } from "react";
import { useInput } from "../hooks/useInput"; 
import { hasMinLength, isEmail } from "../utils/validation";


export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value: string) => isEmail(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value: string) => hasMinLength(value, 6));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (emailHasError || passwordHasError) {
      return;
    }

    console.log(emailValue, passwordValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Email</label>
        <input
          type='email'
          value={emailValue}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
        />
        {emailHasError && <p>Please enter a valid email.</p>}
      </div>

      <div>
        <label>Password</label>
        <input
          type='password'
          value={passwordValue}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
        />
        {passwordHasError && <p>Password must be at least 6 characters.</p>}
      </div>

      <button type='submit'>Login</button>
    </form>
  );
}
