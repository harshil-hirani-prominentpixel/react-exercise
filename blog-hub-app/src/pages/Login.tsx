import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../utils/auth";

const Login = (): React.JSX.Element => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError(null);
    setPasswordError(null);

    let hasError = false;
    if (!usernameOrEmail.trim()) {
      setEmailError("Email or Username is required");
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) return; 

    const res = loginUser(usernameOrEmail.trim(), password);

    if (!res.ok) {
      if (
        res.error === "Invalid email or username" ||
        res.error === "Email must be from prominentpixel.com domain" ||
        res.error === "Email is not registered"
      ) {
        setEmailError(res.error);
      } else if (res.error === "Invalid password") {
        setPasswordError(res.error);
      }
      return;
    }

    navigate("/dashboard");
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
              className={`form-control ${emailError ? "is-invalid" : ""}`}
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder='Enter Username Or Email'
            />
            {emailError && (
              <div className='invalid-feedback d-block'>{emailError}</div>
            )}
          </div>

          <div className='mb-2'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              className={`form-control ${passwordError ? "is-invalid" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Password'
            />
            {passwordError && (
              <div className='invalid-feedback d-block'>{passwordError}</div>
            )}
          </div>

          <button className='btn btn-success w-100 mt-3' type='submit'>
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
