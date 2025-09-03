import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../utils/auth";
import type {JSX} from 'react';

const Login = (): JSX.Element => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = loginUser(usernameOrEmail.trim(), password);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    navigate("/");
  };

  return (
    <div className='auth-container'>
      <form className='auth-card' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p className='subtitle'>Welcome back! Please enter your details.</p>

        <div className='form-group'>
          <label>Username / Email</label>
          <input
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            placeholder='Enter Username Or Email'
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
          />
        </div>

        {error && <p className='err'>{error}</p>}

        <button className='btn-cta' type='submit'>
          Login
        </button>

        <p className='switch-auth'>
          Don't have an account? <Link to='/signup'>Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
