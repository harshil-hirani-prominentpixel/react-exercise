import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../utils/auth";

const Login = (): React.JSX.Element => {
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
    navigate("/login");
  };

  return (
    <div className='auth-container'>
      <form className='card auth-card shadow-sm' onSubmit={handleSubmit}>
        <div className='card-body'>
          <h2 className='mb-1'>Login</h2>
          <p className='text-muted mb-4'>
            Welcome back! Please enter your details.
          </p>

          <div className='mb-3'>
            <label className='form-label'>Username / Email</label>
            <input
              className={`form-control ${error ? "is-invalid" : ""}`}
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder='Enter Username Or Email'
            />
          </div>

          <div className='mb-2'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              className={`form-control ${error ? "is-invalid" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Password'
            />
          </div>

          {error && <div className='invalid-feedback d-block'>{error}</div>}

          <button className='btn btn-primary w-100 mt-3' type='submit'>
            Login
          </button>

          <p className='text-center mt-3 mb-0'>
            Don't have an account? <Link to='/signup'>Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
